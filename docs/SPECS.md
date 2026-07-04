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
