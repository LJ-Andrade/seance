# SEO Standards

Applies to every route in `web/app/[locale]/`. This is a project-wide requirement, not an optional enhancement.

## Metadata

- Every page must export or generate metadata with: `title`, `description`, canonical `alternates.canonical`, and `alternates.languages` covering every supported locale.
- Titles and descriptions come from the JSON translation dictionaries; never hardcode SEO copy in components.
- Use Next.js Metadata API (`generateMetadata`) instead of manual `<head>` tags.

## Localization / hreflang

- Every localized route must declare `alternates.languages` pointing to the equivalent URL in every other supported locale, including a sensible `x-default`.
- Locale switch links must point to the same logical page in the target locale, not the home page.

## Sitemap & Robots

- `sitemap.ts` must enumerate every public route for every supported locale.
- `robots.ts` must allow indexing of public locales and disallow non-public paths (e.g., previews, internal tooling) if any exist.

## Structured Data

- Add JSON-LD where it improves search appearance (Organization on the home page, BreadcrumbList on nested pages, and content-specific types as pages are defined).
- Keep structured data values in sync with the visible, translated content of the page.

## Rendering & Performance

- Prefer Server Components and static rendering (SSG/ISR) for SEO-critical content.
- Any Client Component wrapping SEO-relevant content needs a stated reason (interactivity that cannot be server-rendered).
- Optimize images with `next/image` and set explicit dimensions to protect Cumulative Layout Shift.
- Watch bundle size and avoid unnecessary client-side JavaScript on public-facing routes.

## URLs

- Keep URLs stable, lowercase, and descriptive per locale (localized slugs are acceptable but must be tracked in `docs/SPECS.md`).
- Avoid duplicate content across locales; each locale variant must be reachable through exactly one canonical URL.
