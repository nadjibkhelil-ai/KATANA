# Tech Stack — NK Portfolio

## Core Framework
### Next.js 14 (App Router)
- **Why:** Industry standard for React frameworks, excellent DX, built-in routing, SSR/SSG support
- **Limitations:** Server components require `'use client'` directive for interactivity
- **Docs:** https://nextjs.org/docs
- **Env vars:** `NEXT_PUBLIC_SITE_URL`

### TypeScript 5.x
- **Why:** Type safety, better refactoring, catches errors at compile time
- **Conventions:** Strict mode enabled, no `any` types, explicit return types on all functions

## Styling
### Tailwind CSS 3.4
- **Why:** Utility-first, rapid development, consistent design system
- **Config:** `tailwind.config.ts` with custom colors, fonts, animations
- **Docs:** https://tailwindcss.com/docs

### Framer Motion 10.x
- **Why:** Declarative animations, scroll-triggered reveals, gesture support
- **Docs:** https://www.framer.com/motion/

## Forms & Validation
### React Hook Form
- **Why:** Performant form handling, minimal re-renders
- **Docs:** https://react-hook-form.com/

### Zod
- **Why:** Schema validation, TypeScript-first, integrates with React Hook Form
- **Docs:** https://zod.dev/

## Email
### Resend
- **Why:** Modern email API, React email components, reliable delivery
- **Env vars:** `RESEND_API_KEY`, `CONTACT_EMAIL`
- **Docs:** https://resend.com/docs

## Deployment
### Vercel
- **Why:** Zero-config Next.js deployment, edge network, automatic HTTPS
- **Free tier:** Hobby plan (100GB bandwidth, serverless function limits)