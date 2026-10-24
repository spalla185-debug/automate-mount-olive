// Core logic for POST /api/consult. Kept framework-free (Web Request/Response)
// so it runs on Vercel's Node.js runtime and can be tested locally with plain Node.

export const BUSINESS_TYPES = ['Real Estate', 'Contracting', 'Law', 'Other'];

const MAX_BODY_BYTES = 10 * 1024;
const LIMITS = { name: 100, email: 254, pain_point: 2000 };
const MIN_FILL_MS = 1500; // faster than a human can fill the form
const UPSTREAM_TIMEOUT_MS = 10_000;

// Best-effort, per-instance protection. Serverless instances are short-lived and
// not shared, so this slows down bursts from one IP but is not a global limit.
// Pair it with a Vercel Firewall rate-limit rule for a hard guarantee (see README).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const DEDUPE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map(); // ip -> number[] (timestamps)
const recent = new Map(); // fingerprint -> timestamp

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function json(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extraHeaders },
  });
}

function clientIp(request) {
  const fwd = request.headers.get('x-forwarded-for') || '';
  return fwd.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

function rateLimited(ip, now) {
  const list = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_MAX) { hits.set(ip, list); return true; }
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(k);
  return false;
}

function isDuplicate(fingerprint, now) {
  for (const [k, t] of recent) if (now - t >= DEDUPE_WINDOW_MS) recent.delete(k);
  if (recent.has(fingerprint)) return true;
  recent.set(fingerprint, now);
  return false;
}

// Reject cross-site posts. Browsers always send Origin on a fetch POST.
function originAllowed(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  let originHost;
  try { originHost = new URL(origin).host; } catch { return false; }
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  if (originHost === host) return true;
  const extra = (process.env.CONSULT_ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return extra.includes(origin);
}

export function validate(input) {
  const errors = {};
  const str = (v) => (typeof v === 'string' ? v : '');

  const name = str(input.name).trim();
  const email = str(input.email).trim();
  const business_type = str(input.business_type).trim();
  // Forwarded exactly as typed: no trimming, collapsing or escaping.
  const pain_point = str(input.pain_point);

  if (!name) errors.name = 'Please enter your name.';
  else if (name.length > LIMITS.name) errors.name = `Name must be ${LIMITS.name} characters or fewer.`;

  if (!email) errors.email = 'Please enter your email.';
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';

  if (!BUSINESS_TYPES.includes(business_type)) errors.business_type = 'Please choose a business type.';

  if (!pain_point.trim()) errors.pain_point = "Please tell us what's eating your time.";
  else if (pain_point.length > LIMITS.pain_point) errors.pain_point = `Please keep this under ${LIMITS.pain_point} characters.`;

  return { errors, data: { name, email, business_type, pain_point } };
}

export async function handleConsult(request, { fetchImpl = fetch, now = Date.now() } = {}) {
  if (request.method !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed.' }, { allow: 'POST' });
  }

  if (!originAllowed(request)) {
    return json(403, { ok: false, error: 'This form can only be submitted from our website.' });
  }

  const type = (request.headers.get('content-type') || '').toLowerCase();
  if (!type.includes('application/json')) {
    return json(415, { ok: false, error: 'Unsupported request format.' });
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > MAX_BODY_BYTES) {
    return json(413, { ok: false, error: 'Your message is too long. Please shorten it and try again.' });
  }

  let body;
  try { body = JSON.parse(raw); } catch { body = null; }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json(400, { ok: false, error: 'Invalid request.' });
  }

  // Honeypot / timing traps: pretend it worked so bots don't adapt, but forward nothing.
  const honeypot = typeof body.company_website === 'string' ? body.company_website : '';
  const elapsed = Number(body.elapsed_ms);
  if (honeypot.trim() !== '' || (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS)) {
    return json(200, { ok: true });
  }

  const { errors, data } = validate(body);
  if (Object.keys(errors).length) {
    return json(422, { ok: false, error: Object.values(errors)[0], fields: errors });
  }

  if (rateLimited(clientIp(request), now)) {
    return json(429, { ok: false, error: 'Too many requests. Please wait a few minutes and try again.' }, { 'retry-after': '600' });
  }

  const fingerprint = JSON.stringify([data.email.toLowerCase(), data.business_type, data.pain_point]);
  if (isDuplicate(fingerprint, now)) {
    // Same request already forwarded moments ago; don't create a second lead.
    return json(200, { ok: true, duplicate: true });
  }

  const webhook = process.env.N8N_CONSULT_WEBHOOK_URL;
  if (!webhook) {
    recent.delete(fingerprint);
    console.error('[consult] N8N_CONSULT_WEBHOOK_URL is not set');
    return json(500, { ok: false, error: 'Our form is temporarily unavailable. Please email automatemountolive@gmail.com.' });
  }

  const payload = { ...data, company_website: '' };
  try {
    const res = await fetchImpl(webhook, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    if (!res.ok) {
      recent.delete(fingerprint);
      console.error('[consult] n8n responded', res.status);
      return json(502, { ok: false, error: "We couldn't send your request right now. Please try again in a moment." });
    }
  } catch (err) {
    recent.delete(fingerprint);
    console.error('[consult] n8n request failed:', err && err.name);
    return json(502, { ok: false, error: "We couldn't send your request right now. Please try again in a moment." });
  }

  return json(200, { ok: true });
}
