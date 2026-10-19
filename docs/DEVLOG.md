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

## 2026-08-13 - Fabricación sticky process stack

1. [x] Specify the horizontal card layout, desktop sticky stacking, and mobile
   fallback.
2. [x] Replace the uneven four-column process grid with the sticky stack.
3. [x] Validate responsive structure, lint, and TypeScript.

## 2026-10-07 - Change request v1-10-26, batch 1 (contact data and copy)

Source: client change request "Cambios para el rediseño web" (1 Oct 2026).

1. [x] Unify contact data in `siteConfig.contact`: info@/comex@ emails, `+54 11 4750-0763`; remove Gmail addresses and the duplicated footer block (items 4, 5).
2. [x] Real Facebook/LinkedIn URLs with localized `aria-label`s; localized WhatsApp prefilled message (items 3, 42, 43).
3. [x] Home solution cards link to the service pages; Servicios nav parent no longer links to `#servicios`; data-sheet buttons hidden until PDFs exist (items 1, 2).
4. [x] Copy: ANMAT registration timeline, BPM to BPF, 100% compliance claims, years, Várices, fragrances, formulation options, own-brand separation, 72 business-hour response time, nav labels (items 6, 7, 9, 10, 14, 22, 23, 31, 32, 33).
5. [x] Products copy and formats for alcohol gel, 70% alcohol, repellent and conditioner (items 15, 16, 66).
6. [x] Remove the ISO/TÜV badge and image from Nosotros (item 8; the "Alcance de habilitación" block is pending).
7. [x] Contact message limit raised to 1,500 chars with server-side validation (item 12).
8. [x] Validate TypeScript, lint and rendered pages (es/en).

## 2026-10-07 - Change request v1-10-26, batch 2 (Home)

Approved by the user: items 18, 19, 20, new FAQ, 35 (hero photo), 38, 39.
Rejected: 13 (guide hosting/email gate), 61 (guide HTML summary); 37 handled by the user.

1. [x] Hero paragraph mentions the Grade I / Grade II scope (item 20).
2. [x] Minimum batch + timelines block below the registration statement (items 18, 19).
3. [x] Client FAQ merged into the Home FAQ (and its FAQPage JSON-LD).
4. [x] Descriptive alt text on the Home hero images (item 38).
5. [x] Site-wide 1200x630 Open Graph image cropped from the Home hero (item 35).
6. [x] Organization/LocalBusiness JSON-LD with the confirmed business data (item 39).
7. [x] Validate TypeScript, lint, rendered Home (es/en) and JSON-LD.

Notes: the Home FAQ now has 16 items (the old "protection" question was folded into the new formula, ownership and NDA answers). Next.js derives `twitter:*` tags from Open Graph; removing them (item 36) was not approved.

## 2026-10-07 - Change request v1-10-26, batch 3 (Nosotros)

Approved: items 8/17 (authorization scope block) and 27 (capacity figures).
Rejected: 56 (update date), 57 (lab facts page link), 64 (video transcript).

1. [x] "Alcance de habilitación" list in the Nosotros hero (es/en).
2. [x] Plant capacity figures in "Capacidades técnicas" (es/en).
3. [x] Validate TypeScript, lint and the rendered page (desktop/mobile).

## 2026-10-07 - Change request v1-10-26, batch 4 (Fabricación)

Approved: items 18, 19, 21, 28, 30 and the Home FAQ. Not approved: 38 (category image alts).

1. [x] Five-step process copy; scale the sticky stack to the step count (item 21).
2. [x] "Control de calidad bajo BPF" highlight in the production step (item 28).
3. [x] Domisanitarios category in the products grid (item 30).
4. [x] Minimum batch + timelines block (items 18, 19).
5. [x] Home FAQ section and FAQPage JSON-LD.
6. [x] Validate TypeScript, lint, desktop stack behavior and mobile layout (es/en).

Notes: Domisanitarios renders without a photo until one is supplied. The old step-2 custom-formula highlight and formulation tags moved to the new "Desarrollo" step.

## 2026-10-07 - Change request v1-10-26, batch 5 (Hosting)

1. [x] Open the hosting intro with the client definition of regulatory hosting (item 24, definition only).
2. [x] Remove `meta keywords` from Hosting and the unused helper option (item 40).
3. [x] Validate TypeScript, lint and the rendered page.

Pending client input for item 24: client documentation, end-of-relationship handling of registrations, billing.

## 2026-10-08 - Product data sheets

1. [x] Spanish PDFs added under `web/public/fichas/es/` (by the user).
2. [x] Data-sheet buttons resolve `fichas/<locale>/` with Spanish fallback; hidden when no file exists (item 2).
3. [x] Validate TypeScript, lint and PDF responses for `/es/productos` and `/en/productos`.

Pending: English sheets in `web/public/fichas/en/`.

## 2026-10-08 - SEO and agent readiness (audit items 3-9)

1. [x] Fixed per-route `lastModified` dates in `sitemap.ts`.
2. [x] Organization + WebSite JSON-LD from the locale layout on every page.
3. [x] BreadcrumbList on internal pages.
4. [x] `/llms.txt` route.
5. [x] Header emails/phone as `mailto:`/`tel:` links.
6. [x] Localized 404 page with links to the main pages.
7. [x] Serialize only client-side translation namespaces.
8. [x] Validate TypeScript, lint, rendered pages, JSON-LD, sitemap, llms.txt and 404 (es/en).

Notes: the `[locale]/[...rest]` + `[locale]/not-found.tsx` pattern rendered a client-only `__next_error__` shell in production, so the 404 moved to `app/global-not-found.tsx` (experimental flag). Fonts moved to `lib/fonts.ts` to share them with it. Production build verified: all pages SSG, `/llms.txt` static, 404 server-rendered in es/en.

## 2026-10-15 - Importación copy update (client deck "Texto Importación Integral", 12 Oct 2026)

Applied in order of complexity, with user approval per step.

1. [x] SEO title and meta description (es/en).
2. [x] "Tu marca sigue siendo tuya" band: new eyebrow and paragraph (title unchanged).
3. [x] Four-stage journey: new eyebrow, title, intro and card copy (4 bullets each, no tariff classification); verified fit in the fixed-height stack at 1024-1440px.
4. [x] Hero copy and two-line H1 (`ServiceHero` keeps line breaks; Service JSON-LD name uses the eyebrow). Long CTA labels now wrap inside the gutter on narrow screens.
5. [x] Compliance block copy + "Exportación" highlight (`SplitFeature` `highlight` prop). Mobile hero copy on Importación starts below the containers (`ServiceHero` `mobileCopyOffset`, `pt-[100vw]`).
6. [x] Page-specific trust bar items (`TrustBar` `items` prop). The marquee now repeats short claim sets inside each group (duration scaled to keep the speed), fixing a loop gap on wide screens on every page; repeats are aria-hidden and hidden under reduced motion.
7. [x] Closing CTA: eyebrow, response time and comex@ mailto under the button (new optional `CtaBand` props; other pages unchanged).
8. [x] New six-question FAQ between the brand band and the closing CTA, with FAQPage JSON-LD (es/en).

English copy comes from the client's English deck ("SEANCE_Full_Service_Imports_EN"); items 1-3 were re-applied with it. The English deck settles the closing email: comex@ in the closing CTA, info@ in header/footer.

Open decision: the deck's header/footer page (site-wide labels, German, info@-only) conflicts with earlier decisions; not applied.

## 2026-10-19 - Hosting copy update (client decks "Texto Hosting" / "Regulatory Hosting EN", 12 Oct 2026)

Applied in order of complexity, with user approval per step. English copy from the client's English deck.

1. [x] SEO title and meta description.
2. [x] Page-specific trust bar items.
3. [x] Brand band: new eyebrow, title and paragraph (registration ownership defined in writing).
4. [x] "Qué incluye" eyebrow, title and four cards.
5. [x] Hero copy; H1 measures 4 lines at 1024-1440px (es/en). Service JSON-LD name now uses the eyebrow.
6. [x] "Qué es el hosting" title and two paragraphs; the definition lead and the `SplitFeature` `lead` prop were removed (`paragraphs` prop added). EN: "authorized by ANMAT facilities" rewritten as "ANMAT-authorized facilities".
7. [x] Eight-question FAQ (FAQPage JSON-LD updates automatically). Fixed "Seance" → "Séance" (ES Q1) and "authorized by ANMAT" → "ANMAT-authorized" (EN Q1, Q4).
8. [x] Closing CTA with eyebrow, response time and info@ mailto.
9. [x] "¿Es para tu proyecto?" with eyebrow and three cards (title + description); `CheckCards` updated (only used by Hosting). EN: "ANMAT authorized" → "ANMAT-authorized".
10. [x] Two-column responsibilities block (`Responsibilities`: Séance column in teal, client column in white, numbered items, closing note) replacing `MethodPoints`, which was removed (Hosting was its only user).

Open with the client: registration ownership now reads "defined in writing", while Home/Fabricación FAQ, the Home confidentiality bullet and llms.txt still say it always belongs to the client.

## 2026-10-19 - Header/footer contact details (user request)

1. [x] Add seancepelliza@gmail.com as third email (header, footer, Contacto cards, llms.txt; JSON-LD keeps info@/comex@).
2. [x] WhatsApp line (+54) 9 11-5740-6182 in header (from xl) and footer; wa.me number corrected to 5491157406182.
3. [x] Remove the address from the header bar so it fits on one line (1024-1920px measured).

## 2026-10-19 - New product: Jabón líquido (user request)

1. [x] Seventh Everest product after "Jabón líquido bactericida": client copy, same formats (280ml, 5L), image `jabon-liquido.png`, slug `jabon-liquido` (es/en; EN translated by us). No data sheet yet, so its button stays hidden.
2. [x] Product JSON-LD lists seven products; sitemap date bumped.

## 2026-10-19 - Footer contact split (user request)

1. [x] Footer contact column split into "Escribinos" (emails) and "Contactanos" (phone, WhatsApp, hours); es/en labels.
2. [x] Footer grid: six columns from xl, three per row at lg; no overflow measured at 375-1440px.
3. [x] "Links" column (Inicio, Nosotros, Contacto) removed; five columns from xl; i18n keys `footer.links` and `footer.columnas.links` dropped.

## 2026-10-19 - Fabricación categories layout (user request)

1. [x] Domisanitarios card gets `/images/servicios/domisanitarios.jpeg`.
2. [x] Category grid: rows of three on desktop, incomplete last row stretched (5 = 3 + 2); verified at 375/1024/1440px.

## 2026-10-19 - Process scene overlap on short viewports (user report)

1. [x] Pinned process scene overflowed upward into the hero/trust bar on short desktop viewports (e.g. 125% Windows scaling).
2. [x] Pin only at >=1024px wide and >=760px tall (`pin` custom variant + matching JS/CSS queries); sticky offset aligned to the 124px header.
3. [x] Verified Importación/Fabricación at 1173x632 (normal list, no overlap), 1280x760 and 1440x900 (pinned, fully inside the viewport).
4. [x] Follow-up: restore stacking on short screens. Card height now adapts to the viewport (max 370px, min = tallest step content, measured in JS); pin decided by measured fit (`data-pinned` + `pin` custom variant), sticky offset = measured header height; card vertical padding lg:py-10, heading gap pin:gap-5.
5. [x] Verified: Importación 1173x632 pinned (277px cards, fits), 1440x900 pinned (370px); Fabricación pinned at 1280x800/1440x900, list at 1173x632 (step 2 needs ~409px); mobile unchanged.

## 2026-10-19 - Contacto cards (user request)

1. [x] Phone card adds the WhatsApp line (wa.me link, new tab, same message as the footer).
2. [x] Smaller cards (padding, icon, text-sm); four in a row from xl, 2x2 from md; emails/WhatsApp stay on one line at 1280/1440px (es/en).
