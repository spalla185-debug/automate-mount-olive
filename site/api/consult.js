// Vercel Function: POST /api/consult
// Validates the consultation form and forwards it to the n8n webhook in
// N8N_CONSULT_WEBHOOK_URL. The webhook URL never reaches the browser.
import { handleConsult } from './_lib/consult.js';

export function POST(request) {
  return handleConsult(request);
}

export function GET(request) {
  return handleConsult(request);
}
