# Documentation Index

This directory is the operational memory for the project. Keep each document focused so agents and humans can find the right source quickly.

## Core Documents

| File | Purpose | Update When |
| --- | --- | --- |
| `PROJECT_INFO.md` | Stable overview of architecture, stack, commands, and environment facts. | Architecture, stack, commands, or environment facts change. |
| `SPECS.md` | Source of truth for intended product and technical behavior. | New behavior is planned or existing behavior changes. |
| `ROADMAP.md` | High-level project status and future work. | Work moves between completed, in progress, next up, or planned. |
| `DEVLOG.md` | Active execution plans, per-file checklists, and completed implementation notes. | Multi-file work starts or progresses. |
| `DEPLOY_INFO.md` | Deployment, hosting, and release information. | Deployment process or production infrastructure changes. |
| `standards/` | Reusable implementation standards. | A standard pattern is introduced or revised. |

## Standards

| File | Purpose |
| --- | --- |
| `standards/SEO_STANDARDS.md` | Metadata, hreflang, sitemap, structured data, and Core Web Vitals rules. |
| `standards/I18N_STANDARDS.md` | Locale routing, JSON dictionary structure, and translation key conventions. |

## Agent Update Rules

1. Update `SPECS.md` before implementing new or complex behavior.
2. Add a checklist to `DEVLOG.md` before multi-file execution.
3. Update `ROADMAP.md` only for status-level changes.
4. Update `PROJECT_INFO.md` only for stable facts.
5. Keep deployment details in `DEPLOY_INFO.md`.
6. Keep reusable patterns in `standards/`.

## Current Architecture Facts

- Single Next.js App Router application, no separate backend/CMS.
- Content and copy live in JSON translation files keyed in Spanish.
- Internationalization uses `next-intl` with locale-prefixed routes.
- SEO is a first-class requirement for every route and layout decision.
