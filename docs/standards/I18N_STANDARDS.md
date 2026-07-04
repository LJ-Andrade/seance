# Internationalization Standards

Applies to all locale handling, routing, and translation content in the project.

## Routing

- Use `next-intl` with locale-prefixed routes: `app/[locale]/...`.
- Middleware handles locale detection/redirection; every public route must exist under a locale segment.

## Translation Dictionaries

- Location: `web/messages/<locale>.json`.
- Keys are written in Spanish regardless of the target locale (e.g., `"inicio.titulo"`, not `"home.title"`).
- Every locale file must contain the exact same key set as the default locale file. Missing keys are a bug, not an acceptable gap.
- Group keys by page/section using nested objects (e.g., `{"inicio": {"titulo": "...", "descripcion": "..."}}`) to keep dictionaries scannable.
- Never hardcode user-facing copy in components; always resolve it through `next-intl` translation hooks/functions.

## Adding a New Locale

1. Add the locale code to the supported locales list (routing config).
2. Create `web/messages/<new-locale>.json` with the full key set copied from the default locale.
3. Translate all values; do not leave untranslated placeholders in a shipped locale.
4. Update `alternates.languages` coverage and `sitemap.ts` so the new locale is included.
5. Update `docs/SPECS.md` if the locale list is documented there.

## Adding a New Key

1. Add the key to the default locale file first, grouped under the correct section.
2. Add the same key, translated, to every other locale file immediately — do not defer.
3. Reference the key from the component through the translation function; do not inline text.
