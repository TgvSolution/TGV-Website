# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Solution TGV — Website (`artifacts/tgv-website/`)
- **Type**: React + Vite, presentation-first, no backend
- **Preview path**: `/` (root)
- **Design**: Dark Prestige — cinematic black/gold luxury IT consultancy aesthetic
- **Bilingual**: French (default) / English with browser language auto-detection
  - Auto-detects via `navigator.language` — English if starts with "en", French otherwise
  - User preference saved to `localStorage` key `tgv-lang`
  - Language toggle (FR | EN) in the navigation bar
- **Key files**:
  - `src/i18n/translations.ts` — all FR/EN translations
  - `src/hooks/useLanguage.tsx` — language context, detection, persistence
  - `src/pages/Home.tsx` — full single-page site
  - `public/images/` — logo, hero, product screenshots
- **Products showcased**: SecurFich (securfich.ca) and Tempett

### API Server (`artifacts/api-server/`)
- Express 5 backend, port assigned via PORT env var
- Shared backend for all artifacts

### Canvas / Mockup Sandbox (`artifacts/mockup-sandbox/`)
- Isolated Vite sandbox for UI prototyping on the canvas
- Mockup variants in `src/components/mockups/tgv-website/`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/tgv-website run dev` — run website locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
