import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handleConsult } from '../api/_lib/consult.js';

const WEBHOOK = 'https://example.test/webhook/amo-consult';
process.env.N8N_CONSULT_WEBHOOK_URL = WEBHOOK;

let ipCounter = 0;
function req(body, { method = 'POST', headers = {}, ip } = {}) {
  return new Request('https://automatemountolive.vercel.app/api/consult', {
    method,
    headers: {
      'content-type': 'application/json',
      host: 'automatemountolive.vercel.app',
      origin: 'https://automatemountolive.vercel.app',
      'x-forwarded-for': ip || `10.0.0.${++ipCounter}`,
      ...headers,
    },
    body: method === 'GET' ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
  });
}

function mockFetch(status = 200) {
  const calls = [];
  const fn = async (url, init) => { calls.push({ url, init, body: JSON.parse(init.body) }); return new Response('{}', { status }); };
  fn.calls = calls;
  return fn;
}

let n = 0;
const valid = (over = {}) => ({
  name: 'Jane Smith',
  email: `jane${++n}@business.com`,
  business_type: 'Real Estate',
  pain_point: '  Following up with leads,\n  scheduling "showings" & <intake>  ',
  company_website: '',
  elapsed_ms: 8000,
  ...over,
});

test('forwards exactly the six fields and preserves pain_point verbatim', async () => {
  const f = mockFetch();
  const input = valid();
  const res = await handleConsult(req(input), { fetchImpl: f });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(f.calls.length, 1);
  assert.equal(f.calls[0].url, WEBHOOK);
  assert.deepEqual(f.calls[0].body, {
    name: 'Jane Smith',
    email: input.email,
    business_type: 'Real Estate',
    business_type_other: '',
    pain_point: input.pain_point,
    company_website: '',
  });
});

test('accepts the broader business types', async () => {
  for (const business_type of ['Healthcare/Dental', 'Salon/Beauty', 'Restaurant', 'Home Services', 'Retail']) {
    const f = mockFetch();
    const res = await handleConsult(req(valid({ business_type })), { fetchImpl: f });
    assert.equal(res.status, 200, business_type);
    assert.equal(f.calls[0].body.business_type, business_type);
  }
});

test('forwards the typed business type when Other is chosen', async () => {
  const f = mockFetch();
  const res = await handleConsult(req(valid({ business_type: 'Other', business_type_other: '  Auto repair ' })), { fetchImpl: f });
  assert.equal(res.status, 200);
  assert.equal(f.calls[0].body.business_type, 'Other');
  assert.equal(f.calls[0].body.business_type_other, 'Auto repair');
});

test('ignores a typed business type unless Other is chosen', async () => {
  const f = mockFetch();
  const res = await handleConsult(req(valid({ business_type: 'Retail', business_type_other: 'Auto repair' })), { fetchImpl: f });
  assert.equal(res.status, 200);
  assert.equal(f.calls[0].body.business_type_other, '');
});

test('rejects non-POST with 405', async () => {
  const res = await handleConsult(req(null, { method: 'GET' }), { fetchImpl: mockFetch() });
  assert.equal(res.status, 405);
  assert.equal(res.headers.get('allow'), 'POST');
});

test('validation errors return 422 and do not forward', async () => {
  for (const bad of [
    { name: '' },
    { email: 'not-an-email' },
    { business_type: 'Crypto' },
    { business_type: 'Other', business_type_other: '   ' },
    { business_type: 'Other', business_type_other: 'x'.repeat(101) },
    { pain_point: '   ' },
    { pain_point: 'x'.repeat(2001) },
  ]) {
    const f = mockFetch();
    const res = await handleConsult(req(valid(bad)), { fetchImpl: f });
    assert.equal(res.status, 422, JSON.stringify(bad));
    assert.equal((await res.json()).ok, false);
    assert.equal(f.calls.length, 0);
  }
});

test('filled honeypot is silently accepted but not forwarded', async () => {
  const f = mockFetch();
  const res = await handleConsult(req(valid({ company_website: 'http://spam.example' })), { fetchImpl: f });
  assert.equal(res.status, 200);
  assert.equal(f.calls.length, 0);
});

test('too-fast submission is silently dropped', async () => {
  const f = mockFetch();
  const res = await handleConsult(req(valid({ elapsed_ms: 300 })), { fetchImpl: f });
  assert.equal(res.status, 200);
  assert.equal(f.calls.length, 0);
});

test('cross-origin posts are rejected', async () => {
  const f = mockFetch();
  const res = await handleConsult(req(valid(), { headers: { origin: 'https://evil.example' } }), { fetchImpl: f });
  assert.equal(res.status, 403);
  assert.equal(f.calls.length, 0);
});

test('non-JSON and oversized bodies are rejected', async () => {
  const f = mockFetch();
  assert.equal((await handleConsult(req('name=x', { headers: { 'content-type': 'application/x-www-form-urlencoded' } }), { fetchImpl: f })).status, 415);
  assert.equal((await handleConsult(req('{"a":"' + 'x'.repeat(11000) + '"}'), { fetchImpl: f })).status, 413);
  assert.equal((await handleConsult(req('{not json'), { fetchImpl: f })).status, 400);
  assert.equal(f.calls.length, 0);
});

test('identical resubmission is forwarded only once', async () => {
  const f = mockFetch();
  const input = valid();
  assert.equal((await handleConsult(req(input), { fetchImpl: f })).status, 200);
  const second = await handleConsult(req(input), { fetchImpl: f });
  assert.equal(second.status, 200);
  assert.equal((await second.json()).duplicate, true);
  assert.equal(f.calls.length, 1);
});

test('rate limits a single IP after 5 forwarded requests', async () => {
  const f = mockFetch();
  const statuses = [];
  for (let i = 0; i < 7; i++) statuses.push((await handleConsult(req(valid(), { ip: '192.0.2.50' }), { fetchImpl: f })).status);
  assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429, 429]);
  assert.equal(f.calls.length, 5);
});

test('n8n failure returns 502 and allows a retry', async () => {
  const input = valid();
  const res = await handleConsult(req(input), { fetchImpl: mockFetch(500) });
  assert.equal(res.status, 502);
  const f = mockFetch();
  assert.equal((await handleConsult(req(input), { fetchImpl: f })).status, 200);
  assert.equal(f.calls.length, 1);
});

test('missing webhook env var returns 500 without leaking config', async () => {
  delete process.env.N8N_CONSULT_WEBHOOK_URL;
  try {
    const res = await handleConsult(req(valid()), { fetchImpl: mockFetch() });
    assert.equal(res.status, 500);
    assert.doesNotMatch(await res.text(), /N8N|webhook/i);
  } finally {
    process.env.N8N_CONSULT_WEBHOOK_URL = WEBHOOK;
  }
});
