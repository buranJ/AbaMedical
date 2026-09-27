# ABA Medical

Production-ready migration of [abamed.kg](https://abamed.kg/) from Tilda to Next.js. The site is a B2B catalog and lead-generation platform for medical equipment in Kyrgyzstan.

## Stack and development

Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4, Zod, Vitest and Playwright. Pages are Server Components by default; only navigation, filtering and form states run on the client.

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Copy `.env.example` to `.env.local` for local configuration. `NEXT_PUBLIC_SITE_URL` controls canonicals and schema URLs. Analytics IDs are optional and intentionally blank. Secrets must never use a `NEXT_PUBLIC_` prefix.

## Content architecture

Typed editorial content is in `src/data/content.ts`; the legacy catalog is in `src/data/legacy-products.generated.json`. Interfaces live in `src/types/content.ts`, so a later CMS adapter can replace local data without changing page components.

`scripts/import-legacy-content.mjs` is the reproducible migration utility. It reads the Tilda product sitemap, imports titles and legacy paths, and downloads selected owned assets to `public/images`. Do not run it automatically in production.

## SEO and migration

Metadata is generated with the Metadata API. The sitemap includes static pages, categories, all 100 product pages and articles. Robots, canonical URLs, Open Graph, breadcrumbs and valid JSON-LD are included. Historic paths are centralized in `next.config.ts`; all legacy Tilda product paths permanently redirect to internal product pages.

See `docs/site-audit.md`, `docs/redirect-map.md` and `docs/seo-migration-checklist.md`.

## Forms and deployment

`POST /api/leads` validates with Zod, checks a honeypot, applies a lightweight IP rate limit and returns explicit states. The default `log` transport redacts contact values in development. Set `LEADS_TRANSPORT=webhook`, `LEADS_WEBHOOK_URL` and optionally `LEADS_WEBHOOK_SECRET` to connect a CRM, Telegram gateway or email service. For horizontally scaled deployment, replace the in-memory limiter with a shared store.

Run `npm run build`, configure environment variables and point `abamed.kg` only after staging validation. After launch, submit `/sitemap.xml` to Google Search Console and Yandex Webmaster and monitor old URL hits for 90 days.
