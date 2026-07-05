# Specifications

This is the source of truth for intended product and technical behavior. Update this file before implementing new or complex behavior. Do not use this file as a changelog; execution notes belong in `DEVLOG.md`.

## Internationalization

- Library: `next-intl`.
- Routing: locale-prefixed paths (`/es/...`, `/en/...`, etc.).
- Translation dictionaries are JSON files, one per locale, with keys written in Spanish.
- Every locale file must stay in sync (same key set) with the default locale file.
- Default locale: `es` (Spanish, Argentina). Supported locales: `es`, `en`.
- The architecture must remain open to adding more locales later without restructuring routing or dictionaries.

## SEO

- Every route must define: `title`, `description`, canonical URL, Open Graph tags, and `alternates.languages` (hreflang) for all supported locales.
- `sitemap.xml` must include every localized route.
- `robots.txt` must allow indexing of all public locales.
- Use JSON-LD structured data where it improves search result appearance (e.g., Organization, BreadcrumbList, Article/Product as applicable).
- Prefer Server Components and static rendering (SSG/ISR) to protect Core Web Vitals.

> TBD: add page-by-page specs as pages are defined.

## Pages

### Contact (`/[locale]/contacto`)

- Dedicated route with its own metadata (title, description, canonical, hreflang, OG). Statically rendered.
- Layout (Figma node `44:861`): two-column block — left holds a short heading + intro and the contact form; right holds an embedded map (Google Maps keyless embed, lazy-loaded). Below, a three-card row with direct channels (email, phone, address).
- Form fields: `name` (required), `email` (required, format-validated), `company` (optional), `phone` (optional), `message` (required, min 10 / max 200 chars, with a live character counter). Labels use a red asterisk for required fields; includes a hidden honeypot (`website`) for spam.
- Submission: React Server Action (`submitContactForm`) with server-side validation; localized error/success messages via `next-intl`. On success the form is replaced by a confirmation panel.
- Delivery: Brevo transactional email API, isolated in `lib/email.ts` (`sendContactMessage`), gated on `BREVO_API_KEY` / `BREVO_SENDER_EMAIL` / `CONTACT_TO_EMAIL`. While unset, messages are logged and the flow still reports success (no delivery). Sets `replyTo` to the sender so replies go to the visitor.
- All primary contact CTAs across the site (header, hero, closing band, footer) link to `/contacto`.

## Content Model

- No external CMS or backend. All copy lives in JSON dictionaries under `web/messages/`.
- Non-text content (images, structured content beyond simple copy) approach: TBD.

## Stack Decisions

- Styling: Tailwind CSS.
- UI primitives: shadcn/ui (Radix) copied into the repo for accessible components (FAQ accordion, forms, etc.); bespoke components are built on top to match the Figma design.

## Pending Decisions

- [ ] Hosting/deployment target.
- [ ] Analytics/search console setup.
- [ ] Site purpose/industry and page inventory.
