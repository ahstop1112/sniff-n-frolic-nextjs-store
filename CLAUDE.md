# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands should be run from the repo root unless noted.

### Development
```bash
npm run dev              # Run both frontend and backend concurrently
npm run dev:web          # Frontend only (Next.js on port 3000)
npm run dev:backend      # Backend only (NestJS on port 3002)
```

### Frontend (from `apps/web/`)
```bash
npm run build            # Production build
npm run start            # Start production server
npm run lint             # ESLint
```

### Backend (from `apps/backend/`)
```bash
npm run start:dev        # NestJS watch mode
npm run build            # Compile TypeScript to dist/
npm run start:prod       # Run compiled dist/main
npm run import:woo       # Import products from WooCommerce into PostgreSQL
```

### Database
```bash
docker-compose up -d     # Start PostgreSQL 16 (port 5433 → 5432, db: sniff_catalog)
docker-compose down      # Stop
```

## Architecture

This is a two-app monorepo (not npm workspaces) with independent `package.json` files:
- `apps/web/` — Next.js 16 frontend (App Router, React 19, MUI v7, TypeScript)
- `apps/backend/` — NestJS 11 backend (TypeScript, PostgreSQL via pg driver)

Root `package.json` uses `concurrently` to run both apps.

### Phase-Based Migration Strategy

**Phase 1 (current):** Headless frontend consuming live WooCommerce REST APIs directly.

**Phase 2 (planned):** Custom NestJS backend replaces WooCommerce APIs; frontend switches to point at `apps/backend/`.

The service layer in `apps/web/src/lib/wooClient.ts` abstracts the WooCommerce dependency, making it the single point of change when migrating to Phase 2.

### Frontend Structure (`apps/web/src/`)
- `app/[lang]/` — App Router routes; all pages are under a `[lang]` dynamic segment for i18n
- `lib/` — Service layer: WooCommerce client, caching, filters, search
- `components/` — React components (Cart, Checkout, Product, etc.)
- `context/` — React Context providers for global state (cart, etc.)
- `domains/` — Domain models and business logic
- `types/` — Shared TypeScript interfaces
- `styles/` — SCSS stylesheets; SASS includes are resolved relative to `src/`

### Backend Structure (`apps/backend/src/`)
- `modules/health/` — Health check endpoint
- `modules/products/` — Products domain (NestJS module, controller, service)
- `database/` — PostgreSQL connection configuration
- `app.module.ts` — Root NestJS module

### Key Integrations
- **Stripe**: Payment processing via `@stripe/react-stripe-js`; keys in `apps/web/.env.local`
- **i18n**: `react-i18next` with language routing via `[lang]` segment
- **SEO**: Utilities in `apps/web/src/seo/`
- **Google Tag Manager**: `NEXT_PUBLIC_GTM_ID` in frontend env

## Environment Variables

Frontend (`apps/web/.env.local`): `WOO_API_BASE_URL`, `WOO_CONSUMER_KEY`, `WOO_CONSUMER_SECRET`, `NEXT_PUBLIC_STORE_CURRENCY_CODE`, `NEXT_PUBLIC_GTM_ID`, `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

Backend (`apps/backend/.env`): `PORT` (3002), `DATABASE_URL` (PostgreSQL), `WOO_API_BASE_URL`, `WOO_CONSUMER_KEY`, `WOO_CONSUMER_SECRET`

## Configuration Notes

- `apps/web/next.config.ts`: React Compiler enabled (experimental), TypeScript build errors ignored
- `apps/backend/tsconfig.json`: `experimentalDecorators` and `emitDecoratorMetadata` required for NestJS decorators
- Path alias `@/*` → `./src/*` in the frontend
