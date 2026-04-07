# Model Instructions — NK Portfolio

## Project Identity
NK Portfolio is a professional portfolio site for Nadjib Khelil. Dark mode, gold accents, cinematic design. Tagline: "Design. Automate. Create."

## Coding Style
- Use TypeScript strictly — no `any` types
- Use functional components with explicit return types
- Prefer server components by default; add `'use client'` only when needed
- Validate all API route inputs with Zod
- Use Tailwind utility classes; avoid inline styles
- Commit after every phase completion

## What to Always Do
- Read `docs/` folder at session start for context
- Check `STEPS.md` for current progress before coding
- Use `framer-motion` for animations (scroll reveals, hover states)
- Add ARIA labels to interactive elements
- Test contact form endpoint before marking complete

## What to Never Do
- Hardcode secrets or API keys
- Skip error handling on API routes
- Use placeholder values (`xxx`, `TODO`, `your_key_here`)
- Commit `.env`, `node_modules`, or `.next` folders
- Skip the design system — follow `docs/design-system.md` strictly

## Handling Ambiguity
- If design detail is unclear: default to dark mode with gold accent
- If content is missing: use realistic placeholder text (not "Lorem Ipsum")
- If feature scope is unclear: check `docs/blueprint.md` first, then ask user

## Known Edge Cases
- Contact form must handle network failures gracefully (show error state)
- Project images should have fallback if loading fails
- Mobile nav must be accessible via keyboard (Escape to close)