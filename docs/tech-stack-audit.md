# Phase 1 — Tech Stack Audit Report

**Date**: 2026-10-27  
**Status**: ✅ Complete  
**Local server**: http://localhost:3000 (running)

---

## 1. Confirmed Technology Stack

| Item | Finding |
|---|---|
| **Framework** | React 19 (CSR only — no SSR/SSG) |
| **React version** | 19.2.1 |
| **Build tool** | Vite 7.3.7 |
| **Language** | TypeScript 5.9.3 (strict mode) |
| **Router** | Wouter 3.3.5 (patched at `wouter@3.7.1`) via `<Switch>` + `<Route>` |
| **Rendering** | Client-Side Rendering (CSR). Vite serves the SPA; Express handles the API layer only. No SSR, SSG, or ISR. |
| **Styling** | Tailwind CSS v4.1.14 via `@tailwindcss/vite` plugin + `tw-animate-css 1.4.0`. Global CSS in `client/src/index.css` (118 KB / 449 lines). shadcn/ui "new-york" style with Radix UI primitives. |
| **Animation libraries** | `framer-motion 12.23.22`, `tailwindcss-animate 1.0.7`, `tw-animate-css 1.4.0`, custom CSS animations in `index.css` (marquee, page-transition) |
| **State management** | None (no Redux/Zustand/Jotai). Local component state + TanStack Query for server state. |
| **Data fetching** | tRPC 11.6.0 + TanStack React Query 5.90.2 + SuperJSON 1.13.3. HTTP batch link to `/api/trpc`. |
| **UI components** | shadcn/ui (53 components in `client/src/components/ui/`), Radix UI primitives (full suite installed), Lucide React 0.453.0 |
| **Image optimization** | None configured — raw `<img>` tags serving unoptimized PNG/JPG/MP4 from `client/public/assets/`. No next/image equivalent. |
| **Fonts** | Google Fonts: `Golos Text` (wght 400–700), loaded via `@import url()` in `index.css`. Fallback: Inter, system-ui. Serif fallback: Georgia. **No `font-display` swap set for the Google import.** |
| **Package manager** | pnpm 10.18.0 (enforced via `packageManager` field) |
| **Backend / API** | Express 4.21.2 with tRPC middleware on `/api/trpc`. OAuth routes via `server/_core/oauth.ts`. REST health check at `/api/health`. |
| **Database** | MySQL via Drizzle ORM 0.44.5 + mysql2 3.15.0. Schema at `drizzle/schema.ts`. Migrations via `drizzle-kit`. (`DATABASE_URL` env var required; not set locally — DB unused for this project.) |
| **Server entry** | `server/_core/index.ts` — Express + Vite dev middleware in dev, static serving in prod. |
| **Deployment target** | Docker (Dockerfile present). Production: `node dist/index.js` serving `dist/public/` (Vite build output). |
| **Build commands** | `pnpm dev` (tsx, dev server), `pnpm build` (Vite + esbuild bundle), `pnpm start` (production node) |
| **Test framework** | Vitest 2.1.4. 2 test files, 6 tests (server-only, Node environment). No client-side tests. |
| **Linting / Formatting** | Prettier 3.6.2 (config at `.prettierrc`). No ESLint config detected. |
| **Other notable deps** | `embla-carousel-react`, `recharts`, `react-hook-form`, `zod 4.1.12`, `react-resizable-panels`, AWS S3 SDK (unused locally), `framer-motion` |

---

## 2. Project Structure

```
ctcclone/
├── client/
│   ├── index.html              ← Vite entry; Google Fonts comment-blocked (NOT loading fonts via <link>!)
│   ├── public/
│   │   └── assets/             ← Static assets (images, videos, SVGs)
│   └── src/
│       ├── App.tsx             ← Wouter <Switch> router — 8 routes + NotFound fallback
│       ├── main.tsx            ← React root, tRPC + QueryClient setup
│       ├── index.css           ← 118 KB monolithic CSS file, all styles, responsive breakpoints
│       ├── pages/              ← 10 page components (Home, Explore, Pricing, Institution, Contest, Download, Signup, Login, NotFound, ComponentShowcase)
│       ├── components/         ← Shared: SiteFooter, PageTransition, ErrorBoundary, Chatbot, AIChatBox, DashboardLayout, Map, ManusDialog
│       ├── components/ui/      ← 53 shadcn/ui components
│       ├── contexts/           ← ThemeContext (light/dark)
│       ├── hooks/              ← useComposition, useMobile, usePersistFn
│       └── lib/                ← trpc.ts, utils.ts
├── server/
│   ├── _core/                  ← Express server, tRPC, OAuth, Vite middleware, LLM, storage proxies
│   └── routers/                ← tRPC route handlers
├── shared/                     ← Shared types and constants (client + server)
├── drizzle/                    ← DB schema + migrations
├── docs/                       ← master-plan.md (this directory)
├── patches/                    ← wouter@3.7.1.patch
├── vite.config.ts              ← Vite config with custom Manus debug plugins
├── vitest.config.ts            ← Server-only test setup
├── tsconfig.json               ← Strict TS, paths: @/ → client/src/, @shared/ → shared/
├── package.json                ← Scripts, all deps
└── pnpm-workspace.yaml         ← Workspace + patches + overrides
```

---

## 3. Routing Architecture

| Route | Component | Notes |
|---|---|---|
| `/` | `Home.tsx` | Full homepage — hero, marquee, dual-core, contest, score, infra, FAQ, footer |
| `/institution` | `Institution.tsx` | Institution page with its own header/footer |
| `/explore` | `Explore.tsx` | Course/skill explorer with dark theme |
| `/pricing` | `Pricing.tsx` | Pricing tiers |
| `/signup` | `Signup.tsx` | Signup form |
| `/login` | `Login.tsx` | Login (institution / student selector) |
| `/contest` | `Contest.tsx` | Contest page |
| `/download` | `Download.tsx` | Download page |
| `/404` | `NotFound.tsx` | Explicit 404 route |
| `*` (fallback) | `NotFound.tsx` | Catch-all for unknown routes |

**Router**: Wouter `<Switch>` — no lazy loading, all routes eagerly imported. No Suspense boundaries on any route. **No `/contact` route exists.** The Contact link in the navbar scrolls to `#contact` (the footer has `id="contact"`).

**PageTransition**: A global `<PageTransition>` component intercepts all internal link clicks, calls `navigate()`, and shows a branded overlay for 520ms on every route change.

---

## 4. Assets Inventory

| Asset | Type | Size | Issue |
|---|---|---|---|
| `hero-promo-office.jpg` | JPEG | 1,466 KB | **Very large** — LCP image, needs optimization |
| `Web-version.mp4` | Video | 4,011 KB | Large video autoplay asset |
| `Software.mp4` | Video | 1,810 KB | Large video autoplay asset |
| `university-institution-exterior.jpg` | JPEG | 970 KB | Large hero image |
| `badge-practice.png` | PNG | 441 KB | Should be WebP |
| `badge-ctc-hero.png` | PNG | 438 KB | Should be WebP |
| `badge-software.png` | PNG | 288 KB | Should be WebP |
| `Home.png`, `Learning-custom.png`, etc. | PNG | 162–182 KB | Should be WebP |
| Marquee SVGs | SVG | 0.2–8.6 KB | Acceptable |

**Total assets**: ~10.5 MB (unoptimized). The hero JPEG at 1.47 MB is a critical LCP problem.

---

## 5. Commands Executed & Results

### 5.1 TypeScript Type Check (`pnpm check`)
```
Exit code: 0 — PASS
No type errors reported.
```

### 5.2 Tests (`pnpm test`)
```
Test Files: 2 passed (2)
Tests:      6 passed (6)
Duration:   3.68s

Files:
  ✓ server/auth.logout.test.ts  (1 test)
  ✓ server/platform.test.ts     (5 tests)

Warnings: 
  - [OAuth] ERROR: MANUS_OAUTH_API_URL is not configured — expected in local dev, not a blocker.
  - [Auth] Session payload missing required fields — one test sub-assertion, passes overall.
```

No client-side tests exist. Only server-side tests are present.

### 5.3 Production Build (`pnpm build`)
```
Exit code: 0 — PASS
Vite built in 7.61s — 1720 modules transformed

Outputs:
  dist/public/api/platform/config.js    0.09 kB
  dist/public/index.html                1.09 kB │ gzip: 0.58 kB
  dist/public/assets/index-*.css      193.29 kB │ gzip: 34.66 kB
  dist/public/assets/index-*.js       917.20 kB │ gzip: 218.22 kB

⚠ WARNING: index-*.js is 917 KB (gzip: 218 KB) — exceeds 500 KB chunk size limit.
  Build tool recommends code-splitting via dynamic import() or manualChunks.

Server bundle: dist/index.js  27.7 KB
```

**Non-critical build warning**: Script tag in `index.html` without `type="module"` for `config.js` — emitted as warning, does not fail the build.

### 5.4 Development Server
```
Command: pnpm dev (tsx server/_core/index.ts)
Status: RUNNING on http://localhost:3000

Health check:  GET /api/health → 200 {"status":"ok"}
Home page:     GET /            → 200
All routes:    /institution, /explore, /pricing, /contest, /download, /signup, /login → 200

OAuth warning: MANUS_OAUTH_API_URL not configured (expected in local dev).
```

### 5.5 Git Status
```
NOT a Git repository — no .git directory found.
Consequence: Git history cannot be inspected, diffs cannot be computed, and Git-based rollback is unavailable.
Action: No destructive file operations will be performed.
```

---

## 6. Known Warnings / Pre-existing Issues

| # | Severity | Description |
|---|---|---|
| W-1 | **High** | JS bundle is 917 KB (218 KB gzip) — single monolithic chunk, no code splitting |
| W-2 | **High** | `hero-promo-office.jpg` is 1.47 MB unoptimized — will dominate LCP |
| W-3 | **High** | No lazy loading on any route — all 10 pages load eagerly on initial visit |
| W-4 | **Medium** | Google Fonts `@import url()` in CSS — render-blocking, no `font-display: swap` |
| W-5 | **Medium** | `client/src/index.css` is 118 KB — large monolithic stylesheet |
| W-6 | **Medium** | No Suspense boundaries anywhere in the component tree |
| W-7 | **Medium** | PageTransition overlay always triggers on every navigation (520ms fixed delay) |
| W-8 | **Low** | No ESLint config — code quality not linted beyond TypeScript |
| W-9 | **Low** | No client-side tests — all UI behavior is manually tested only |
| W-10 | **Low** | `MANUS_OAUTH_API_URL` not set — OAuth endpoints non-functional locally |
| W-11 | **Low** | `DATABASE_URL` not set — Drizzle ORM / MySQL non-functional locally (not needed for UI) |
| W-12 | **Low** | Fonts loaded via CSS `@import` in `index.html` (comment says "delete this block") — fonts ARE loading via `index.css` import but the `<link preconnect>` tags in HTML are commented out |
| W-13 | **Info** | `baseline-browser-mapping` data is >2 months old — dev warning only |

---

## 7. What Works Correctly

- ✅ Development server starts cleanly on port 3000
- ✅ All 8 main routes return HTTP 200
- ✅ TypeScript type check passes with zero errors
- ✅ Both test files pass (6/6 tests)
- ✅ Production build succeeds (exit 0) with Vite + esbuild
- ✅ Health endpoint `/api/health` responds correctly
- ✅ Wouter SPA routing works without full page reloads
- ✅ All page components exist and are mapped
- ✅ shadcn/ui components present (53 components)
- ✅ `ErrorBoundary` wraps the entire app
- ✅ `PageTransition` component provides branded loading overlay

---

## 8. What Cannot Be Verified at Phase 1

- Browser-visible rendering quality (requires Phase 2 browser inspection)
- Lighthouse scores (requires Phase 6 measurement)
- Animation behavior fidelity vs. reference (requires Phase 2)
- Contact navbar behavior in practice (requires Phase 4 investigation)
- Mobile layout correctness (requires Phase 8)
- Auth / OAuth flows (MANUS_OAUTH_API_URL not configured)
- Database operations (DATABASE_URL not configured)

---

## 9. Dependency Flags

| Dependency | Version | Note |
|---|---|---|
| `wouter` | 3.3.5 (resolved from 3.7.1 patch) | Patched — do not upgrade without testing |
| `framer-motion` | 12.23.22 | Present but usage not confirmed in all pages |
| `tailwindcss` | 4.1.14 | v4 uses `@tailwindcss/vite` plugin (no tailwind.config.ts file) |
| `tw-animate-css` | 1.4.0 | Supplemental CSS animation utilities |
| All Radix UI | Latest ^1.x–^2.x | Full suite installed; many may be unused |
| AWS S3 SDK | ^3.693.0 | Installed but likely unused in UI |
