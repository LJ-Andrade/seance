# Seamce - Project Information

## Overview

Seamce is a multi-language website built with Next.js (App Router), designed with SEO as a core requirement. There is no backend/CMS: all copy and content live in JSON translation files inside the repository, keyed in Spanish, and served through `next-intl` with locale-prefixed routes.

> TBD: add a short description of the site's purpose/industry once defined.

## Project Structure

```text
seamce-repo/
+-- web/                 # Next.js App Router application
|   +-- app/
|   |   +-- [locale]/    # Locale-prefixed routes (layout + pages)
|   |   +-- sitemap.ts   # All routes x all locales
|   |   +-- robots.ts
|   |   +-- globals.css  # Tailwind v4 + shadcn theme tokens
|   +-- i18n/            # next-intl routing, navigation, request config
|   +-- messages/        # JSON translation dictionaries (keys in Spanish)
|   +-- components/ui/   # shadcn/ui components (Radix)
|   +-- components/seo/  # Safe server-rendered JSON-LD serialization
|   +-- lib/             # Site config, metadata, and structured-data builders
|   +-- proxy.ts         # next-intl middleware (Next 16 "proxy" convention)
+-- docs/                # Project documentation, specs, roadmap, and dev log
```

## Stack

- Next.js 16 (App Router) + React 19, TypeScript.
- Tailwind CSS v4 for styling; shadcn/ui (Radix base) for accessible primitives.
- `next-intl` v4 for internationalization and locale-prefixed routing (`es` default, `en`).
- Content/copy stored as JSON dictionaries, no external CMS or backend.
- SEO tooling: Metadata API (`lib/seo.ts`), `sitemap.ts`, `robots.ts`, JSON-LD structured data.
- Base URL configured via `NEXT_PUBLIC_SITE_URL` (see `web/.env.example`).

## Data Flow

```text
JSON dictionaries (messages/*.json) --> next-intl --> Server Components --> rendered pages
```

Rules:

- No backend/API layer; content changes are file changes in `messages/`.
- Translation keys are written in Spanish regardless of the locale they translate to.
- Every locale must have a complete, in-sync set of keys across its JSON dictionary.

## Environment

> TBD: fill in once hosting/deployment is decided (e.g., Vercel, VPS + Nginx).

## Commands

```bash
cd web
npm install
npm run dev
npm run build
```

## Documentation Map

- `docs/SPECS.md`: technical specifications and approved contracts.
- `docs/ROADMAP.md`: completed, active, and upcoming work.
- `docs/DEVLOG.md`: execution checklist and historical implementation notes.
- `docs/PROJECT_INFO.md`: high-level architecture and project orientation.
