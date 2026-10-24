# Automate Mount Olive: deployable site

This folder is the whole Vercel project. The design is the Claude Design export `project/Landing Page v4.dc.html`, unchanged visually. A full-page screenshot diff against the original at 1440px and 390px shows zero changed pixels.

```
site/
  index.html              Landing Page v4 + consultation form wired to /api/consult
  support.js              Claude Design runtime (unchanged copy)
  vendor/                 React 18.3.1 UMD, byte-identical to the CDN files support.js pins (same SRI hashes)
  api/consult.js          Vercel Function: POST /api/consult
  api/_lib/consult.js     Validation, spam checks, rate limit, forwarding to n8n
  vercel.json             Security headers, no-store on /api
  tests/, scripts/        Local tests and dev server (excluded from deploys by .vercelignore)
```

## What changed from the design file

Only the "Not ready to pick a time?" form:

- Fields now have `name`s and labels linked to inputs: `name`, `email`, `business_type`, `business_type_other` (shown only when "Other" is picked), `pain_point`, plus an off-screen `company_website` honeypot.
- Submitting POSTs JSON to `/api/consult`. While it's sending, the button reads "Sending…" and is disabled. Double clicks and repeated Enter presses send only one request.
- On success, the existing "Thanks, we'll be in touch." panel shows. On failure, an inline message appears above the button and everything the visitor typed stays in the form.
- All four fields are required. "What's eating your time?" was optional in the design.
- The Calendly iframe and the "Open full calendar ↗" link are untouched.

## /api/consult behaviour

| Case | Response | Forwarded to n8n? |
|---|---|---|
| Valid submission | `200 {"ok":true}` | Yes: exactly `name, email, business_type, business_type_other, pain_point, company_website:""` |
| Honeypot filled, or submitted under 1.5 s after page load | `200 {"ok":true}` (silent) | No |
| Missing or invalid field | `422` with a message | No |
| Same email + type + message within 10 min | `200 {"ok":true,"duplicate":true}` | No (already sent) |
| More than 5 forwarded requests per IP in 10 min | `429` | No |
| Cross-site `Origin` | `403` | No |
| Not JSON / over 10 KB / bad JSON | `415` / `413` / `400` | No |
| n8n error or timeout (10 s) | `502` | Attempted (can be retried) |
| `N8N_CONSULT_WEBHOOK_URL` not set | `500` | No |
| Any method except POST | `405` | No |

`pain_point` is forwarded exactly as typed: no trimming, escaping, or collapsing. `name`, `email`, and `business_type_other` are trimmed. `business_type_other` is required when `business_type` is `Other` (max 100 characters) and is sent as `""` otherwise.

The rate limit and duplicate check live in memory on each function instance. They stop bursts but aren't a global guarantee. For a hard limit, add a Vercel Firewall rate-limit rule on `/api/consult` (Project → Firewall → Configure → Rate Limit) if your plan includes it. The n8n workflow should also drop any submission where `company_website` isn't empty.

## Deploy to the EXISTING Vercel project (no Git)

Existing project: `automate-mount-olive-3787dbbf-b3ab-45b0-9aeb-a383c3f399b7` (serves https://automatemountolive.vercel.app).

```bash
npm i -g vercel
vercel login                      # same account that owns the project
cd site

# Link this folder to the existing project. Do NOT create a new one.
vercel link --project automate-mount-olive-3787dbbf-b3ab-45b0-9aeb-a383c3f399b7
#   If it asks "Link to existing project?" answer YES and pick that project.
#   Answering "no" creates a second project, which is what we don't want.

# The env var already exists for Production. Confirm it's there:
vercel env ls
#   If you're not sure the value is right, replace it:
#   vercel env rm N8N_CONSULT_WEBHOOK_URL production
#   vercel env add N8N_CONSULT_WEBHOOK_URL production
#   → paste your n8n production webhook URL (the ".../webhook/amo-consult" one).
#     Keep it out of the repo: anyone with it can post straight to n8n.

vercel deploy --prod
```

`vercel deploy --prod` builds this folder and promotes it to the project's production domain, `automatemountolive.vercel.app`. Env vars only reach new deployments, so redeploy after any env change.

The env var is set for **Production only**. Preview deployments (`vercel deploy` without `--prod`) will return the "temporarily unavailable" error from the form unless you also add the variable for Preview.

## Verify after deploying

1. **Route exists** (sends nothing to n8n):
   ```bash
   curl -i https://automatemountolive.vercel.app/api/consult
   # expect: HTTP 405, {"ok":false,"error":"Method not allowed."}   (not 404)
   curl -i -X POST https://automatemountolive.vercel.app/api/consult \
     -H 'content-type: application/json' -d '{"name":""}'
   # expect: HTTP 422 with a validation message
   ```
2. **Full end-to-end** (creates a real lead): open the site in a private window, scroll to Contact, fill the form with your own email and a multi-line message, and click "Request a consultation".
   - The button reads "Sending…" and then the thank-you panel appears.
   - In DevTools → Network, there is one `POST /api/consult` with status 200.
   - n8n → Executions shows a new run of the `amo-consult` workflow. Its webhook body has the six fields, and `pain_point` matches what you typed exactly.
   - The Google Sheet row and confirmation email arrive (whatever your workflow does).
3. **Calendly**: the embedded calendar loads, and "Open full calendar ↗" opens `calendly.com/spalla185/30min` in a new tab.
4. If something fails: Vercel → Project → Logs, filter by `/api/consult`. Server errors are logged with a `[consult]` prefix.

## Local development

```bash
cd site
npm test                                                    # handler unit tests
N8N_CONSULT_WEBHOOK_URL=https://... npm run dev             # http://localhost:3000
```
