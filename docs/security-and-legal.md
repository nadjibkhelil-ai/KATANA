# Security & Legal — KATANA BURGER

## Security Implementation

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

### General Security
- No user data collection — no forms, no login, no database
- No third-party scripts that track users
- All content is static and publicly accessible
- No API keys or secrets needed

## Legal Compliance (Algeria)

### Required Pages
- [ ] Mentions Légales — Restaurant owner info, registration number, hosting provider
- [ ] Privacy Policy — Only if analytics/tracking is added later

### Not Required
- **Cookie consent** — No tracking cookies, no analytics by default
- **GDPR compliance** — Algeria is not in EU scope (but good practices still apply if EU visitors)

## Checklist
- [x] No secrets in code or commits
- [x] No user data collection
- [x] Security headers configured
- [ ] Mentions Légales page created
- [ ] Footer links to legal pages