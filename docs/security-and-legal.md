# Security & Legal — NK Portfolio

## Security Implementation

### API Route Protection
- **Contact form:** Rate limited to 10 requests per hour per IP
- **Input validation:** All form inputs validated with Zod schema
- **Email sanitization:** Strip HTML tags from user inputs before processing
- **Error handling:** Generic error messages (no stack traces exposed)

### Headers Configuration
```ts
// next.config.js
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]
```

### Environment Variables
- `RESEND_API_KEY` — never exposed to client
- `CONTACT_EMAIL` — safe to expose if needed, but kept server-side
- All secrets stored in `.env` only, never committed

## Legal Compliance

### GDPR (EU/France)
- **Data collected:** Only contact form submissions (name, email, message)
- **Purpose:** Responding to inquiries
- **Retention:** Emails stored in inbox only, no database
- **User rights:** Right to erasure (delete email on request)
- **Privacy Policy:** Required — link in footer

### Required Pages
- [ ] Privacy Policy (mentions data collection, retention, user rights)
- [ ] Mentions Légales (if operating in France — owner identity, hosting provider)

### Cookie Consent
- **Not required** — no tracking cookies, no analytics by default
- If analytics added later (Plausible, Google Analytics), add consent banner

## Checklist
- [x] No secrets in code or commits
- [x] All inputs validated and sanitized
- [x] Rate limiting on contact form
- [x] Security headers configured
- [ ] Privacy Policy page created
- [ ] Footer links to legal pages