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
- Home, Nosotros, Fabricación, Hosting, Importación, Productos, and Contacto use
  route-specific localized title tags and meta descriptions supplied by the
  client. No route emits `meta keywords`.
- Every page shares one Open Graph image (1200x630) cropped from the Home hero
  product photo.
- The shared `Organization` + `LocalBusiness` node carries the client-confirmed
  data: legal name (SEANCE SRL), founding year, address, phone, info@ and
  comex@ contact points with languages (es, en), opening hours (Monday to
  Friday, 08:00-17:00), Facebook/LinkedIn `sameAs`, areas of expertise and the three-service offer catalog. No `hasCredential`
  (client decision); service languages are Spanish and English only.
- Structured data uses a stable, locale-independent organization identifier
  (`/#organization`) so page-specific entities can reference the same business:
  - Home: `Organization` + `LocalBusiness`, `FAQPage`, and `Person` for Andrea
    Pelliza and Enrique Pelliza.
  - Nosotros: `AboutPage` linked to the shared organization.
  - Fabricación, Hosting, and Importación: localized `Service` entities linked
    to the shared organization; Hosting also includes its visible `FAQPage`.
  - Productos: one localized `Product` entity per visible Everest item, with
    Everest as the brand and the shared organization as manufacturer.
  - Contacto: `ContactPage` linked to the shared `Organization` +
    `LocalBusiness` entity.
- JSON-LD descriptions and FAQ answers must reuse visible localized page content.
  Unknown business facts (such as opening hours, tax identifiers, prices, stock,
  reviews, or product codes) must be omitted rather than inferred.
- Product data-sheet buttons link to selectable-text PDFs in
  `web/public/fichas/<lang>/<product-slug>.pdf`, opened in a new tab. Each
  locale uses its own sheet when present and falls back to Spanish (with
  `hreflang`); a product without any sheet hides the button. Sheets are
  resolved at build time, so adding PDFs requires a rebuild.
- Business data (contact channels, socials, response time, capacities,
  timelines) must match the client-confirmed data in the October 2026 change
  request. Contact data lives only in `siteConfig.contact` (`web/lib/site.ts`).

- The shared `Organization` + `LocalBusiness` node and a `WebSite` node are
  emitted once per page from the locale layout (description: the visible
  footer tagline), so page-level entities (`AboutPage`, `Service`, `Product`,
  `ContactPage`) always resolve their `@id` references.
- Every internal page emits a `BreadcrumbList` (Home > page; service pages use
  Home > service, since there is no Servicios index page).
- `sitemap.xml` uses a fixed, per-route `lastModified` date that must be bumped
  when that page's content changes (never the build date).
- `/llms.txt` is generated from `siteUrl` and lists the main pages in both
  locales plus confirmed business data, for assistants that read the site
  directly.
- Unknown URLs render a localized, server-rendered 404 (`app/global-not-found.tsx`,
  enabled with `experimental.globalNotFound` because the root layout lives under
  `[locale]`): HTTP 404, `noindex`, site header/footer and links to the main
  pages. A `[locale]/[...rest]` catch-all is not used: with this layout setup it
  produced a client-only error shell.
- The header contact bar (desktop) shows the three emails and the phone as
  `mailto:` / `tel:` links, plus the WhatsApp line from 1280px (the floating
  WhatsApp button covers smaller widths). The address is not in the bar; it
  lives in the footer and on Contacto. The footer splits contact into
  "Escribinos" (the three emails) and "Contactanos" (phone, WhatsApp line and
  business hours); there is no generic "Links" column (Inicio, Nosotros and
  Contacto live in the header). Five columns from 1280px, three per row at
  1024px. All values come from
  `siteConfig.contact` (`whatsapp` display form, `whatsappNumber` for wa.me).
- Only the translation namespaces used by Client Components (`navegacion`,
  `contacto`) are serialized into the page; everything else stays server-side.

> TBD: add page-by-page specs as pages are defined.

## Pages

### Home minimum batch and timelines

- On Home and Fabricación, the "Registro ANMAT" statement and the minimum
  batch + timelines share a full-width split panel (`Registro`, same pattern as
  Nosotros "Misión y visión"): registration on the left (cream), a compact
  `CondicionesPanel` on the right (`#F0EBE1`, the Home "Proceso" background);
  stacked on mobile.
- The block shows the minimum batch
  (500 L, or 5,000 units in formats under 100 ml) and the three timelines as
  separate rows of a semantic HTML table: formula development (1 to 3 months),
  ANMAT registration (about 72 business hours with a complete dossier) and
  production (about 4 weeks with raw and packaging materials on site).
- Copy lives in the shared `condiciones` namespace so Fabricación can reuse it.
- The Home hero paragraph states the Grade I / Grade II scope (liquid,
  semi-solid and alcohol-based forms; Grade II imports in every category).
- The Home FAQ includes the client-supplied questions (minimum batch,
  timelines, Grade II, own formula, registration ownership, household products,
  NDA, languages, response time) and feeds the `FAQPage` JSON-LD verbatim.

### Nosotros authorization scope and capacities

- The hero shows an "Alcance de habilitación" list (client-supplied copy) where
  the ISO/TÜV badge used to be: ANMAT-authorized cosmetics manufacturing and
  conditioning (liquid, semi-solid, alcohol-based) plus cosmetics import/export;
  household products manufacturing and import; Grade I/II registration and
  production; GMP (BPF); in-house Technical Director and Regulatory Affairs.
- "Capacidades técnicas" opens with three plant figures: tanks up to 3,500 L,
  200,000 units per month and filling from 2 ml to 200 L.

### Home solution cards

- The three cards in "Soluciones integrales para tu Marca" use a restrained
  pointer-driven chrome-card effect on non-touch devices: center-based `rotateX`
  and `rotateY` with slight elevation. No cursor-following light or overlay is
  applied.
- Cards return smoothly to their neutral position when the pointer leaves.
  Motion is disabled for touch input and `prefers-reduced-motion`, while links
  and server-rendered card content remain fully accessible.

### Responsive service heroes

- Fabricación, Hosting, and Importación use the shared `ServiceHero` with a
  dedicated desktop image and a dedicated portrait mobile image.
- At widths below 900px, the portrait image renders at its full intrinsic
  composition (`object-contain`, aligned to the top) so its lower clear area is
  preserved for the localized hero copy.
- At 900px and above, the existing wide desktop image remains on the right with
  its readability mask and the hero copy remains left-aligned.
- Fabricación is the desktop exception: its panoramic source already includes
  the white copy area, so it renders full-width without the split mask to avoid
  excessive cropping.
- The heading, paragraph, and CTA remain server-rendered once in the document;
  responsive image presentation must not duplicate SEO-critical copy or create
  layout shift.
- On fine-pointer devices, Home and service hero backgrounds react to horizontal
  pointer movement with a restrained center-pivot parallax: a small horizontal
  translation and `rotateY` perspective shift. The motion resets on pointer
  leave, keeps enough scale overscan to hide image edges, and is disabled when
  `prefers-reduced-motion` is active.

### Importación (full-service imports)

- Copy follows the client decks of 12 Oct 2026 (Spanish "Texto Importación
  Integral" and English "Full-Service Imports").
- Sections: hero (two-line H1, mobile copy below the containers), page-specific
  trust bar, four-stage process, regulatory block with an "Exportación"
  highlight, brand/confidentiality band, six-question FAQ (with `FAQPage`
  JSON-LD) and a closing CTA with response time and a `comex@` mailto.
- Shared components gained optional props only (`ServiceHero`
  `mobileCopyOffset`, `TrustBar` `items`, `SplitFeature` `highlight`,
  `CtaBand` `eyebrow`/`note`/`email`), so other pages are unchanged.

### Hosting (regulatory hosting)

- Copy follows the client decks of 12 Oct 2026 (Spanish "Texto Hosting" and
  English "Regulatory Hosting").
- The "Qué es el hosting regulatorio" block uses the client's two paragraphs
  (`SplitFeature` `paragraphs`); the earlier highlighted definition was
  replaced at the client's request.
- Client documentation, end-of-relationship handling and billing are covered by
  the new FAQ and the responsibilities block.
- Section order: hero, trust bar, what it is, what's included, brand band,
  responsibilities ("Séance aporta" / "Vos aportás", Séance first on mobile),
  audience cards (title + description), eight-question FAQ and closing CTA
  with response time and an `info@` mailto.

### Fabricación additions

- "¿Qué productos elaboramos?" adds a fifth category, Domisanitarios (room,
  textile and car fresheners), with its own photo (`domisanitarios.jpeg`).
  On desktop the five category cards render as rows of 3 + 2 (6-column grid;
  an incomplete last row stretches its cards); one column below 1024px.
- After the process steps, Fabricación uses the same registration + minimum
  batch split panel as Home, followed by the Home FAQ (same `inicio.faq`
  source and its `FAQPage` JSON-LD).

### Fabricación process steps

- Five steps (client order: briefing and feasibility, development, dossier and
  ANMAT registration, production and control, release) render as full-width
  horizontal cards so variable content length never creates mismatched columns.
  Step 2 keeps the custom-formula highlight and formulation options; step 4
  carries the "Control de calidad bajo BPF" highlight.
- The pinned scene height and card stage scale with the number of steps.
- At desktop widths, the complete process scene (heading, description, and card
  stage) stays pinned and vertically centered while scrolling. Every new card
  settles slightly below the previous one, leaving a narrow visible strip of
  each earlier card. Incoming cards remain invisible while waiting below the
  viewport, use a very short fade over their first few visible pixels, and then
  travel upward at full opacity, covering the preceding card without blended
  text. The scene releases into normal page scrolling as soon as the last
  card finishes stacking.
- All desktop cards share the same height, at least the richest step's
  content, so no earlier content can protrude below the active card.
- The scene pins right below the sticky header (measured height). The card
  height adapts to the viewport: 370px when there is room, shrinking on short
  screens but never below the richest step's content. The scene measures this
  on load/resize and sets `data-pinned`; the `pin` variant in globals.css
  applies only at >=1024px with `data-pinned="true"`. If heading + card stage
  cannot fit under the header, and on smaller screens, the steps fall back to
  a normal vertical list with no sticky trapping or oversized scroll
  distance, and never overlap the section above.
- The scene uses native page scrolling in both directions. Card movement is
  interpolated from scroll progress and lightly eased; no wheel interception or
  scroll trapping is used.
- The complete localized content remains server-rendered and readable when
  motion is reduced or CSS positioning is unavailable.

### Contact (`/[locale]/contacto`)

- Dedicated route with its own metadata (title, description, canonical, hreflang, OG). Statically rendered.
- Layout (Figma node `44:861`): two-column block — left holds a short heading + intro and the contact form; right holds an embedded map (Google Maps keyless embed, lazy-loaded). Below, a card grid with direct channels (email, phone + WhatsApp link, address, business hours): one column on mobile, 2x2 on tablet, four in a row from 1280px. Business hours (Monday to Friday, 8 to 17 h) also appear in the footer contact column.
- Form fields: `name` (required), `email` (required, format-validated), `company` (optional), `phone` (optional), `message` (required, min 10 / max 1,500 chars, validated on the server, with a live character counter). Labels use a red asterisk for required fields; includes a hidden honeypot (`website`) for spam.
- Submission: React Server Action (`submitContactForm`) with server-side validation; localized error/success messages via `next-intl`. On success the form is replaced by a confirmation panel.
- Delivery: Brevo transactional email API, isolated in `lib/email.ts` (`sendContactMessage`), gated on `BREVO_API_KEY` / `BREVO_SENDER_EMAIL` / `CONTACT_TO_EMAIL`. While unset, messages are logged and the flow still reports success (no delivery). Sets `replyTo` to the sender so replies go to the visitor.
- All primary contact CTAs across the site (header, hero, closing band) link to `/contacto`.

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
