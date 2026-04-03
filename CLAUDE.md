# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Next.js dev server (port 3001)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
```

### Testing (Playwright e2e)
```bash
npx playwright test                   # Run all tests
npx playwright test tests/snf.spec.ts # Run a specific test file
npx playwright test --ui              # Interactive UI mode
```

Tests run against `http://localhost:3001` by default (set `BASE_URL` env var to override). The app must be running before running tests.

## Architecture

This is a single **Next.js 16** app (App Router, React 19, MUI v7, TypeScript) — not a monorepo. All source code lives in `src/`.

### Phase-Based Migration Strategy

**Phase 1:** Headless frontend calling WooCommerce REST APIs directly.

**Phase 2 (current):** Frontend now calls a custom NestJS backend via `API_BASE_URL`. The `wooClient.ts` service layer still exports `WooProduct`/`WooCategory` shapes so no components needed changes — adapters inside `wooClient.ts` convert NestJS API responses to those shapes. `getProductVariations` and `getCategoryById` still fall back to WooCommerce directly.

### Key Abstraction: `wooClient.ts` → `apiClient.ts`

`src/lib/wooClient.ts` is the **single data-access boundary** for all product and category data. It:
- Exports typed `WooProduct`/`WooCategory` interfaces (components depend on these)
- Fetches from the NestJS backend via `src/lib/apiClient.ts` (reads `API_BASE_URL`)
- Adapts NestJS API shapes to the Woo interface via `apiProductToWoo` / `apiCategoryToWoo`
- Applies Next.js ISR cache via `CACHE_CONFIG` in `src/lib/cache.ts`

When migrating an endpoint from WooCommerce to the NestJS backend, update only `wooClient.ts`.

### Routing

All pages live under `src/app/[lang]/` — the `[lang]` dynamic segment drives i18n. The root `src/app/page.tsx` redirects to the default locale. The layout at `src/app/[lang]/layout.tsx` fetches categories once (cached 1 hr) and wraps all pages in providers.

### Context Providers (set up in `[lang]/layout.tsx`)

- `CartProviderClient` — cart state
- `I18nProvider` / `LocaleProvider` — i18n
- `CurrencyProvider` — currency formatting
- `CategoriesProvider` — categories fetched at layout level, not per-page
- `ProductsProvider` — product state

### AI Chatbot (Fei Fei)

`src/app/api/chat/route.ts` — Next.js API route that powers the AI shopping assistant. Uses `@anthropic-ai/sdk` with `claude-sonnet-4-20250514`. It fetches live product inventory from the NestJS backend and injects it into the system prompt. Responses may include a `PRODUCTS_JSON:` block with slugs that the frontend parses to display product cards. Requires `ANTHROPIC_API_KEY`.

The chatbot UI lives in `src/components/AIChatbot/` and is mounted globally in `[lang]/layout.tsx`.

### Caching Strategy

Defined in `src/lib/cache.ts` using Next.js ISR:
- Categories: 1 hour (`CACHE_CONFIG.CATEGORIES`)
- Products list: 5 minutes (`CACHE_CONFIG.PRODUCTS`)
- Product detail: 10 minutes (`CACHE_CONFIG.PRODUCT_DETAIL`)
- Search: no cache (`CACHE_CONFIG.SEARCH`)

### Next.js API Routes (`src/app/api/`)

- `chat/` — AI chatbot (Anthropic SDK)
- `categories/` — category data proxy
- `checkout/` — checkout logic
- `stripe/` — Stripe payment integration

## Environment Variables

```
# NestJS backend URL (required - replaces WooCommerce for products/categories)
API_BASE_URL=

# WooCommerce (still used for variations and getCategoryById)
WOO_API_BASE_URL=
WOO_CONSUMER_KEY=
WOO_CONSUMER_SECRET=

# AI Chatbot
ANTHROPIC_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Store config
NEXT_PUBLIC_STORE_CURRENCY_CODE=
NEXT_PUBLIC_GTM_ID=
```

## Configuration Notes

- `next.config.ts`: React Compiler enabled, TypeScript build errors ignored, remote images allowed from `sniffnfrolic.com`
- `tsconfig.json`: Path alias `@/*` → `./src/*`
- SASS `includePaths` set to `src/` so imports resolve relative to `src/`
