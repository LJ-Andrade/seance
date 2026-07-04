# Development Log

Execution log and active implementation checklists. Add a numbered checklist before multi-file execution and mark items as completed as work progresses. Keep this separate from `SPECS.md` (intended behavior) and `ROADMAP.md` (status-level tracking).

## 2026-07-03 - Project Bootstrap

1. [x] Create `AGENTS.md` with project orchestrator instructions
2. [x] Create `CLAUDE.md` pointing to `AGENTS.md`
3. [x] Create `docs/README.md` documentation index
4. [x] Create `docs/PROJECT_INFO.md` with stack and structure baseline
5. [x] Create `docs/SPECS.md` with i18n/SEO baseline and pending decisions
6. [x] Create `docs/ROADMAP.md` with initial status
7. [x] Create `docs/DEPLOY_INFO.md` placeholder
8. [x] Create `docs/standards/SEO_STANDARDS.md` and `docs/standards/I18N_STANDARDS.md`
9. [ ] Scaffold the Next.js App Router project in `web/`

## 2026-07-03 - Next.js Scaffold + i18n Baseline

Decisions: locales `es` (default) + `en`; Tailwind CSS; shadcn/ui (Radix).

1. [x] Scaffold Next.js App Router app in `web/` (TS, Tailwind v4, ESLint, `@/*` alias, no `src/`) — Next 16.2, React 19.2
2. [x] Install and configure `next-intl` v4 (routing config, `proxy.ts`, request config, plugin in `next.config.ts`)
3. [x] Create `app/[locale]/` layout + home route with locale param handling and static rendering
4. [x] Create `messages/es.json` and `messages/en.json` with Spanish-keyed baseline
5. [x] Add shared metadata helper `lib/seo.ts` (title/description/canonical/OG/hreflang + x-default)
6. [x] Implement `sitemap.ts` and `robots.ts` for all locales
7. [x] Initialize shadcn/ui (Radix base, Nova preset) and confirm Tailwind v4 pipeline
8. [x] Verify production build (`/es`, `/en` SSG) and lint run clean
9. [x] Update `docs/PROJECT_INFO.md` structure and `ROADMAP.md`

Notes:
- Next 16 renamed the `middleware` file convention to `proxy`; the next-intl middleware lives in `proxy.ts`.
- Base URL comes from `NEXT_PUBLIC_SITE_URL` (see `web/.env.example`); must be set in production.

## 2026-07-03 - Home build: design system + Hero

Source of truth: Figma "Seance-Laboratorio" (fileKey `AzxF423Ta4JvADX632zffg`), Home frame `1:2105`.

1. [x] Establish design tokens from Figma: brand palette (primary `#CD9D71`, teal `#0F4C5C`, ink `#2B3032`, muted `#908A81`, cream `#FCFCFA`/`#F4E8DB`) in `globals.css`; mapped shadcn semantic tokens to brand so `Button` renders teal
2. [x] Fonts: Cormorant (serif headings, italic) + Inter (body) via `next/font/google`, replacing Geist
3. [x] Hero section `components/sections/hero.tsx` (node `32:821` text + `1:2106` background/product image)
4. [x] Product image downloaded to `public/images/hero-productos.png`, rendered with `next/image` + `priority` (LCP)
5. [x] Hero i18n keys (`inicio.hero`: eyebrow/titulo/parrafo/cta/imagenAlt) in `es.json` + `en.json`
6. [x] Wire Hero into home; build + lint clean; runtime renders both locales

## 2026-07-03 - Home build: full page + layout + shared primitives

Reusable primitives: `Container`, `Eyebrow`, `Heading`, `SectionHeader`, `CtaButton`,
`ArrowLink`, `NavLink`, brand `Icons` (lucide has no brand glyphs in v16 → custom SVGs).

1. [x] Layout chrome: `Header` (sticky, contact bar + nav + `LocaleSwitcher` + `MobileNav`), `Footer`, `WhatsAppFloat`
2. [x] Sections (Figma Home order): Hero, TrustAnchor, TrustBar, Soluciones (cards), Confidencialidad, Stats, Servicios, Proceso, Guia, Registro, Nosotros, Everest, Faq (shadcn accordion), Cierre (CTA + Newsletter)
3. [x] Full brand token set in `globals.css` (cream 1/2/3/deep, teal, primary, ink, slate, muted) mapped to shadcn semantic tokens
4. [x] Fonts standardized on Cormorant Garamond (serif) + Inter (body)
5. [x] Images downloaded to `public/images/`: hero-productos, confidencialidad, fundador-c5n, logo-seance
6. [x] i18n: full `inicio.*`, `navegacion`, `footer` key sets in `es.json` + `en.json`
7. [x] Build (`/es`, `/en` SSG), lint and runtime smoke test all clean

Known TODOs / decisions:
- Placeholders: Everest wordmark (no logo asset yet), Guia cover (icon placeholder).
- Newsletter panel color (teal) is an inference; confirm against design.
- CTAs/social/newsletter point to `#contacto`/`#` until real routes/forms exist.
- Product images are PNG — convert to WebP/AVIF for weight.
- Multi-page nav (Nuestro Equipo, Productos) still points to on-page anchors.
