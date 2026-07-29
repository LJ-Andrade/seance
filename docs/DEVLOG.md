# Development Log

Execution log and active implementation checklists. Add a numbered checklist before multi-file execution and mark items as completed as work progresses. Keep this separate from `SPECS.md` (intended behavior) and `ROADMAP.md` (status-level tracking).

## 2026-07-15 - Temporary demo tunnel documentation

1. [x] Document how to run and stop a temporary Cloudflare Quick Tunnel for local demos.
2. [x] Add the guide to the documentation index and deployment notes.

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
- Newsletter CTA still points to `#` until the signup flow exists.
- Product images are PNG — convert to WebP/AVIF for weight.
- Multi-page nav (Nuestro Equipo, Productos) still points to on-page anchors.

## 2026-07-04 - Contact page + form (`/contacto`)

Dedicated contact route with a Server Action form; Brevo delivery wired but
gated on env vars (works end-to-end without them by logging).

1. [x] `lib/email.ts` — `sendContactMessage` via Brevo transactional API, gated on `BREVO_API_KEY` / `BREVO_SENDER_EMAIL` / `CONTACT_TO_EMAIL`
2. [x] `app/[locale]/contacto/actions.ts` — `submitContactForm` Server Action with server-side validation + localized messages + honeypot
3. [x] `components/sections/contact/contact-form.tsx` (client, `useActionState`) and `contact-info.tsx` (server)
4. [x] `app/[locale]/contacto/page.tsx` — page + `buildMetadata` (metadatos.contacto)
5. [x] i18n: `metadatos.contacto` + `contacto` namespace in `es.json` + `en.json`
6. [x] Point all contact CTAs to `/contacto` (header, hero, cierre, footer); add `contacto` to `sitemap.ts`
7. [x] `.env.example`: Brevo variables
8. [x] Build (`/es/contacto`, `/en/contacto` SSG), lint and runtime smoke test (form/info/hreflang) clean

Pending: connect Brevo key when available; optional ContactPage/Organization JSON-LD; localized slug (`/en/contact`) if desired.

## 2026-07-04 - Servicios dropdown + service pages

Nav "Servicios" becomes a dropdown to three pages under `/servicios/*`.

1. [x] Nav: `NavItem.children`; `NavDropdown` (CSS hover/focus, Server Component); header + `MobileNav` render children
2. [x] Shared service components: `ServiceHero`, `InfoCardGrid`, `AnmatBand`, `CtaBand` (teal closing band, terracotta button); reuse home `TrustBar`
3. [x] Page 1 — Fabricación (`/servicios/fabricacion`, Figma `24:1417`): hero, trust bar, "¿A quién servimos?" (4 cards), "¿Qué productos elaboramos?" (2×2 image cards + prompt), "4 pasos" process, ANMAT band, closing CTA
4. [x] Fabricación-specific components: `ProductCategories`, `ProcessSteps`; images under `public/images/servicios/`
5. [x] i18n `servicios.fabricacion` + `metadatos.fabricacion` (es/en); `navegacion.serviciosItems`; sitemap `servicios/fabricacion`
6. [x] Build (SSG es/en), lint, runtime smoke test clean
7. [x] Page 2 — Hosting (`/servicios/hosting`, Figma `39:2101`): hero, intro split, "Qué incluye" (icon cards), titularidad band, método (points), "¿Es para vos?" (check cards), FAQ, closing CTA
8. [x] Page 3 — Importación (`/servicios/importacion`, Figma `52:1117`): hero, "todo el recorrido" (4 step cards w/ bullets), "cumplimiento" (split + bullets), titularidad band, closing CTA
9. [x] More shared components: `SplitFeature`, `IconCardGrid`, `HighlightBand`, `MethodPoints`, `CheckCards`, `FaqSection`
10. [x] Dropdown labels shortened to section names; sitemap has all 3; build (SSG es/en), lint, smoke tests clean

## 2026-07-04 - Nosotros + Productos pages

1. [x] `/nosotros` (Figma `10:491`): hero (video + ISO badge), trust bar, solutions overview → service pages, capabilities, audience, mission/vision split, values, Everest own-brand, closing CTA
2. [x] Nosotros components under `components/sections/nosotros/`: `AboutHero`, `SolutionsOverview`, `Capabilities`, `AudienceCards`, `MissionVision`, `Values`, `OwnBrand`
3. [x] `/productos` (Figma `57:1586`): Everest hero + 6 product cards (photo, description, format chips, data-sheet button) + closing CTA; `ProductCard` component
4. [x] Nav: "Nuestro Equipo" → `/nosotros`, "Productos" → `/productos`; footer link → `/nosotros`; sitemap adds both
5. [x] i18n `nosotros` + `productos` namespaces and `metadatos.*` (es/en); images under `public/images/nosotros/` and `public/images/productos/`
6. [x] Build (SSG es/en for all 9 routes), lint, runtime smoke tests clean
7. [x] Git identity set to javzero <javzero1@gmail.com>

Pending: product data-sheet buttons link to `#` until real PDFs exist; hero video links to the (placeholder) YouTube URL in `siteConfig.social`.

## 2026-07-04 - Contact page: match Figma design (node 44:861)

Reworked the first-pass contact layout to the actual Figma design.

1. [x] Two-column: form (left) + embedded Google Maps (right, `contact-map.tsx`); three channel cards below (`contact-cards.tsx`, replaces `contact-info.tsx`)
2. [x] Form redesign: 2-col field grid, 56px inputs (6px radius, `#e9eaec` border), required red asterisks, message char counter (0/200), compact uppercase "Enviar" button
3. [x] i18n: `contacto.form` fields now carry `label` + `placeholder`; added `tarjetas` and `mapaAlt`; copy taken from the design
4. [x] Build (`/es/contacto`, `/en/contacto` SSG), lint and runtime smoke test clean

## 2026-07-23 - Route metadata and structured data

1. [x] Audit existing metadata, localized content, business data, FAQs, products,
   people, contact details, and product data-sheet availability.
2. [x] Add localized client-provided title tags, meta descriptions, and Hosting
   keywords for all seven public page types.
3. [x] Add reusable JSON-LD serialization and shared organization identity.
4. [x] Add page-specific Organization/LocalBusiness, Person, FAQPage, AboutPage,
   Service, Product, and ContactPage graphs.
5. [x] Validate lint, TypeScript/production build, generated metadata, JSON-LD,
   canonical URLs, and hreflang.
6. [x] Record unresolved client inputs: business opening hours and approved
   selectable-text product data-sheet PDFs.

## 2026-07-23 - Responsive service hero images

1. [x] Audit portrait mobile assets, dimensions, composition, and route mapping.
2. [x] Extend the shared `ServiceHero` with a dedicated mobile image.
3. [x] Wire Fabricación, Hosting, and Importación to their matching mobile asset.
4. [x] Verify desktop/mobile composition, localized copy flow, image sizing, and
   absence of horizontal overflow.
5. [x] Validate lint, TypeScript, and the production build.

## 2026-07-23 - Hero pointer parallax

1. [x] Specify horizontal-only movement, center pivot, overscan, reset behavior,
   and reduced-motion handling.
2. [x] Add a small reusable Client Component that exposes pointer position as
   CSS custom properties while preserving server-rendered hero content.
3. [x] Apply the shared motion to Home and service hero image layers.
4. [x] Validate pointer reset, responsive behavior, no exposed edges, lint,
   TypeScript, and production build.

## 2026-07-23 - Solution card chrome tilt

1. [x] Specify pointer-driven 3D tilt, reset behavior, touch guards,
   and reduced-motion handling.
2. [x] Add a reusable Client Component while preserving server-rendered card
   content and link semantics.
3. [x] Apply the effect to the three Home solution cards.
4. [x] Validate cursor response, neutral reset, responsive behavior, lint,
   TypeScript, and production build.

## 2026-07-29 - Site-wide scroll reveals

Extend the Home scroll-reveal language (`Reveal`, `ChromeTilt`) to the rest of
the site so every page shares the same entrance motion.

1. [x] Nosotros sections: solutions overview, capabilities, audience, mission and
   vision, values, own brand.
2. [x] Service sections: info/icon grids, product categories, process steps,
   split feature, method points, check cards, bands, FAQ.
3. [x] Productos and Contacto pages plus the shared closing CTA band.
4. [x] Keep above-the-fold hero copy unanimated (LCP) and validate lint,
   TypeScript, and the production build.

`ChromeTilt` was also applied to the Nosotros solution cards and the Everest
product cards, with a slow hover zoom on the split-feature, category and product
images. The reveal transition itself could not be observed in the automated
browser pane (hidden tab, so `IntersectionObserver` never fires — the Home
baseline behaves the same); layout was verified by forcing the revealed state.
