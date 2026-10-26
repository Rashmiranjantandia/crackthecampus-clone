# MASTER PLAN — Crack The Campus Replica Audit, Routing Fixes & Maximum Performance Optimization

> **Manus project**: <https://manus.im/app/vBX9wmz2tn2AQpEkBS4V9G>
> **Original reference**: <https://crackthecampus.com/>
> **Dev environment**: Antigravity
> **Primary objective**: Audit the existing codebase, fix identified issues, and optimize performance without sacrificing functionality.
> **Constraint**: Manus tokens exhausted — all work uses local source code only.
> **Last updated**: Phase 1 complete. Issues A–I catalogued and phase-assigned. Awaiting Phase 2 approval.

---

## NON-NEGOTIABLE RULES

- [ ] Do **not** rewrite the entire project from scratch.
- [ ] Do **not** change the existing framework or major dependencies without justification and approval.
- [ ] Do **not** redesign the UI, change brand identity, replace assets, or remove working features.
- [ ] Do **not** remove animations to improve performance — optimize their implementation instead.
- [ ] Do **not** add unnecessary libraries, dependencies, or architectural complexity.
- [ ] Do **not** overwrite existing environment files, credentials, local data, or user changes.
- [ ] **Never** expose API keys, secrets, env vars, or private data in logs/reports/commits.
- [ ] Do **not** claim success unless actually executed and verified.
- [ ] Keep changes small, focused, reversible, and testable.
- [ ] Inspect before modifying. Establish baseline → implement → compare.
- [ ] If a change could break functionality, explain trade-offs and **ask first**.
- [ ] Preserve Git history; avoid destructive Git operations.

---

## VERIFIED ISSUES REGISTER

All issues below were discovered during Phase 1. Each is assigned a priority, investigation phase, implementation phase, verification criteria, and status marker. **No implementation tasks are marked complete yet.**

---

### Issue A — No Git Repository Detected

| Field | Value |
|---|---|
| **Priority** | P0 |
| **Finding** | `c:\Users\rashm\Desktop\Gunjan\Coding\CrackTheCampus\ctcclone` is **not a Git repository** — no `.git` directory found. Confirmed via `git status` in Phase 1. |
| **Evidence** | `fatal: not a git repository (or any of the parent directories): .git` |
| **Risk** | Any file change is irreversible without a manual backup. Git-based rollback, diffs, and history are unavailable. |
| **Investigation phase** | Phase 1 (complete — not a git repo) |
| **Implementation phase** | Before any code changes: establish a safe rollback mechanism. |
| **Required actions** | ⬜ Verify whether a parent directory contains a `.git` repo. ⬜ If no Git exists, initialize a repo (`git init`) and make an initial commit of the current state before touching any files. ⬜ Confirm all existing files are committed before beginning implementation phases. |
| **Constraints** | Do not use destructive Git operations. Do not force-push or rebase existing work. |
| **Verification** | `git log --oneline` shows at least one commit covering the current codebase state before any code change. |
| **Status** | ⬜ Rollback mechanism not yet established |

---

### Issue B — Large JavaScript Bundle (917 KB uncompressed)

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Finding** | Production build produces a **single 917 KB JS bundle** (218 KB gzip). Vite emits a chunk-size warning. All 10 page components are eagerly imported. |
| **Evidence** | `dist/public/assets/index-*.js  917.20 kB │ gzip: 218.22 kB` — build warning: chunks larger than 500 KB after minification. |
| **Root cause (suspected)** | No route-level code splitting. All page components imported statically in `App.tsx`. Full Radix UI suite and possibly unused heavy deps (`framer-motion`, `recharts`, `embla-carousel`, AWS SDK) pulled into the initial bundle. |
| **Investigation phase** | Phase 1 ✅ (size confirmed) → Phase 6 (identify heavy deps, measure before/after) |
| **Implementation phase** | Phase 6 (route-level lazy loading, dynamic imports, manual chunks) |
| **Required actions** | ⬜ Inspect generated bundle with source-map explorer or Vite bundle visualiser. ⬜ Identify which deps account for the bulk. ⬜ Apply route-level lazy loading via `React.lazy` + `Suspense`. ⬜ Consider `build.rollupOptions.output.manualChunks` for vendor splitting. ⬜ Record before/after compressed sizes. |
| **Constraints** | Do not break direct URL access, Back/Forward, or existing routing behavior. Do not add new bundler plugins without justification. |
| **Verification** | Post-optimization gzip bundle < 150 KB for the initial route, or a demonstrated significant improvement with before/after measurements documented. |
| **Status** | ⬜ Optimization not yet implemented |

---

### Issue C — Large Hero Image (1.47 MB JPEG)

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Finding** | `client/public/assets/hero-promo-office.jpg` is **1,466 KB** — served unoptimized as the above-the-fold background image. Multiple other images are also oversized (badge PNGs 288–441 KB, institution JPEGs 970 KB). |
| **Evidence** | `Get-ChildItem` audit in Phase 1. Hero image set as CSS background-image in `.hero-image` class. |
| **Root cause** | No image optimization pipeline. Raw original assets served directly. No WebP/AVIF conversion. No responsive variants. |
| **Investigation phase** | Phase 1 ✅ (sizes confirmed) → Phase 6 (determine actual dimensions, verify LCP impact) |
| **Implementation phase** | Phase 6 (compress, convert to WebP, add responsive variants) |
| **Required actions** | ⬜ Verify hero image dimensions and confirm it is the LCP element. ⬜ Create WebP version at appropriate resolution. ⬜ Add `<picture>` / `srcset` where applicable. ⬜ Verify `loading="eager"` on hero — **do not lazy-load the LCP image**. ⬜ Optimize badge PNGs and institution JPEGs similarly. ⬜ Record Lighthouse LCP before/after. |
| **Constraints** | Preserve visual quality. Do not change the artistic composition. Do not lazy-load above-the-fold images. |
| **Verification** | Hero image transfer size < 200 KB (WebP, appropriately sized). LCP improvement demonstrated in Lighthouse report. |
| **Status** | ⬜ Optimization not yet implemented |

---

### Issue D — No Route-Level Lazy Loading

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Finding** | All 10 page components (`Home`, `Explore`, `Pricing`, `Institution`, `Contest`, `Download`, `Signup`, `Login`, `NotFound`, `ComponentShowcase`) are **statically imported** in `App.tsx`. No `React.lazy`, no `Suspense`, no route-level code splitting. |
| **Evidence** | `App.tsx` lines 7–15: direct `import X from './pages/X'` for all pages. Single 917 KB bundle in build output. |
| **Root cause** | Default Wouter + React setup without lazy loading configured. |
| **Investigation phase** | Phase 1 ✅ (confirmed) → Phase 5 (routing behavior impact) |
| **Implementation phase** | Phase 5 (lazy load routes) + Phase 6 (measure bundle impact) |
| **Required actions** | ⬜ Convert page imports to `React.lazy(() => import('./pages/X'))`. ⬜ Wrap `<Switch>` in `<Suspense fallback={...}>` with a visually appropriate fallback. ⬜ Ensure direct URL access still resolves correctly. ⬜ Verify Back/Forward navigation works. ⬜ Ensure `ErrorBoundary` catches lazy-load failures. ⬜ Measure per-route JS chunk sizes after splitting. |
| **Constraints** | Do not break direct URL access or browser navigation. The Wouter router must remain in place. Do not migrate to a different router. |
| **Verification** | Each route served as a separate chunk in the build output. Initial bundle significantly smaller. All routes verified to load correctly via direct URL and SPA navigation. |
| **Status** | ⬜ Not yet implemented |

---

### Issue E — Slow Navigation and White Screens

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Finding** | Reported: navigation between pages feels slow, white screen appears during some transitions, and some routes appear blank while loading. Current `PageTransition` component triggers a 520ms branded overlay on every route change regardless of actual load speed. |
| **Evidence** | `PageTransition.tsx` line 37: `window.setTimeout(() => setLoading(false), 520)` — hard-coded 520ms delay regardless of whether content is ready. All routes eagerly loaded (Issue D), so transition delays may compound with bundle parse time. |
| **Root cause (suspected)** | Combination of: (a) 917 KB monolithic bundle parse time on first visit; (b) `PageTransition` always injecting a 520ms full-screen overlay even when navigation is instant; (c) no Suspense fallbacks to show incremental content. |
| **Investigation phase** | Phase 3 (reproduce in browser, record timeline) |
| **Implementation phase** | Phase 5 (routing fix, Suspense, controlled loading overlay) |
| **Required actions** | ⬜ Reproduce with browser DevTools — record URL-change to first-paint timeline. ⬜ Determine whether delay is bundle download, render, or an artificial timer. ⬜ Fix root causes (bundle splitting, lazy loading) before adding loading UI. ⬜ Make `PageTransition` delay conditional — only show overlay when actual load takes >100ms. ⬜ Ensure no route produces a silent, irrecoverable blank screen. ⬜ Provide an error/retry state when lazy loading fails. |
| **Constraints** | Do not remove the PageTransition animation — improve its triggering logic. Do not add artificial delays. Preserve the branded CTC overlay design. |
| **Verification** | Navigation from Home to any route completes visible render in < 300ms on a local network. White screen reproducibly eliminated. Loading overlay only appears when load genuinely takes >100ms. |
| **Status** | ⬜ Not yet reproduced or fixed |

---

### Issue F — Google Fonts Loaded via CSS `@import` (Potential Render-Blocker)

| Field | Value |
|---|---|
| **Priority** | P2 |
| **Finding** | `client/src/index.css` line 1 uses `@import url('https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700&display=swap')`. The `<link rel="preconnect">` tags in `index.html` are **commented out**. No `font-display` directive is set in the local CSS. |
| **Evidence** | `index.css` line 1; `index.html` lines 11–15 (commented-out font block). |
| **Root cause** | Original Google Font link was removed from HTML and replaced with a CSS `@import`, which can be render-blocking because the browser must parse the CSS before discovering the font request. |
| **Investigation phase** | Phase 1 ✅ (confirmed) → Phase 6 (measure actual render-blocking impact in Lighthouse) |
| **Implementation phase** | Phase 6 (restore `<link rel="preconnect">` in HTML, add `font-display: swap` to CSS `@font-face` or use display param) |
| **Required actions** | ⬜ Measure Lighthouse FCP and font-related render-blocking with current setup as baseline. ⬜ Restore `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` to `index.html`. ⬜ Add `display=swap` parameter to the Google Fonts URL (already present in the URL — verify it is respected). ⬜ Consider moving the `@import` to a `<link>` in `index.html` for earlier discovery. ⬜ Measure FCP improvement after change. |
| **Constraints** | Do not change the `Golos Text` typeface. Do not cause a visible FOUT that disrupts the layout. Preserve all font weights actually used (400, 500, 600, 700). |
| **Verification** | Google Fonts request appears in Network waterfall before CSS parse completes. Lighthouse no longer flags the font as a render-blocking resource. No layout shift from FOUT visible in CLS score. |
| **Status** | ⬜ Not yet implemented |

---

### Issue G — Contact Navbar Behavior

| Field | Value |
|---|---|
| **Priority** | P1 |
| **Finding** | Phase 1 inspection: the site footer (`SiteFooter.tsx`) has `id="contact"`. The `reference-audit-notes.md` states: *"The route loading overlay is not part of the reference navbar interaction; navbar clicks use the same shared header treatment and immediate navigation."* No `/contact` route exists. |
| **Evidence** | `SiteFooter.tsx` line 4: `<footer className="site-footer reference-footer" id="contact">`. No `Contact` link located in the Home page navbar (needs Phase 2 browser inspection of both original and replica). |
| **Root cause (suspected)** | Either: (a) the replica's Contact link uses a broken `href`; (b) it points to `#contact` but `PageTransition` intercepts the click and calls `navigate()` instead of allowing the hash scroll; or (c) Contact is not wired at all. |
| **Investigation phase** | Phase 2 (verify original Contact behavior), Phase 3 (reproduce in replica) |
| **Implementation phase** | Phase 4 (implement correct behavior) |
| **Required actions** | ⬜ Inspect original `https://crackthecampus.com/` — click Contact in navbar, observe destination and behavior. ⬜ Locate Contact element in local navbar component. ⬜ Test whether `PageTransition` intercepts `#contact` hash links (line 19 of `PageTransition.tsx` excludes `href.startsWith('#')` — verify this is actually working). ⬜ Implement correct behavior (hash scroll to `#contact` or whatever the original does) using existing routing. ⬜ Test mobile navbar Contact link. ⬜ Verify keyboard accessibility and focus states. |
| **Constraints** | Do not invent a new `/contact` page unless the original has one. Do not break Back/Forward. Preserve existing PageTransition behavior for non-hash links. |
| **Verification** | Clicking Contact in desktop and mobile navbar scrolls to or navigates to the same destination as the original site. No blank screen. No unexpected full-page reload. |
| **Status** | ⬜ Reference behavior not yet verified — awaiting Phase 2 |

---

### Issue H — No Client-Side Tests

| Field | Value |
|---|---|
| **Priority** | P2 |
| **Finding** | Vitest is configured for `server/**/*.test.ts` only. Zero client-side tests exist. All UI behavior — routing, Contact navigation, animations, responsive layouts, error states — is untested and unverifiable without manual browser inspection. |
| **Evidence** | `vitest.config.ts` line 17: `include: ["server/**/*.test.ts", "server/**/*.spec.ts"]`. Phase 1 test run: 2 test files (both server-side), 6 tests, no client tests. |
| **Investigation phase** | Phase 3 (assess test gap and select framework) |
| **Implementation phase** | Phase 9 (add regression tests) |
| **Required actions** | ⬜ Assess existing Vitest setup for client-side test support (jsdom/happy-dom). ⬜ Determine whether adding `@testing-library/react` is appropriate. ⬜ Add tests for: Contact navbar destination, route loading, direct URL access, Back/Forward, lazy-load error boundaries, key buttons, image loading. ⬜ Do **not** disable or modify existing passing server tests. ⬜ Record test results in Phase 10 report. |
| **Constraints** | Do not add a second testing framework if Vitest + jsdom is sufficient. Do not overwrite or skip existing server tests. |
| **Verification** | At minimum, the Contact navbar action, every route (direct URL + SPA), and critical interactive components have at least one automated test. All existing 6 server tests continue to pass. |
| **Status** | ⬜ Client tests not yet written |

---

### Issue I — Large Monolithic CSS File (118 KB source)

| Field | Value |
|---|---|
| **Priority** | P2 |
| **Finding** | `client/src/index.css` is **118 KB source / 449 lines** — a single file containing all page styles, animations, responsive breakpoints, and Tailwind imports. Build produces `index-*.css` at **193 KB** (34.7 KB gzip). |
| **Evidence** | File size from Phase 1 listing. Build output: `dist/public/assets/index-*.css  193.29 kB │ gzip: 34.66 kB`. |
| **Root cause** | Tailwind v4 generates all utility classes plus the custom CSS is a single monolithic file. No CSS code splitting is configured. All page-specific styles are co-located. |
| **Investigation phase** | Phase 1 ✅ (size confirmed) → Phase 6 (identify duplicate/unused rules, measure actual render-blocking impact) |
| **Implementation phase** | Phase 6 (remove confirmed-unused rules, review Tailwind purge config, avoid breaking responsive states) |
| **Required actions** | ⬜ Measure actual gzip transfer of CSS. ⬜ Use Chrome Coverage panel to identify genuinely unused CSS. ⬜ Remove confirmed-dead rules (not rules that appear unused only because they apply on interaction or mobile). ⬜ Verify Tailwind v4 purge/content config is correctly set to scan all component files. ⬜ Do **not** split into per-page CSS files if that would require architectural changes. |
| **Constraints** | Do not remove responsive states, animation rules, or hover/focus styles. Do not change visual appearance. CSS size optimization is secondary to correctness. |
| **Verification** | No visual regression after CSS cleanup. Coverage panel shows meaningful reduction in unused CSS percentage. Gzip transfer size documented before and after. |
| **Status** | ⬜ Optimization not yet implemented |

---

## PHASE 1 — CODEBASE DISCOVERY AND TECH STACK AUDIT

**Status**: ✅ Complete — see [`docs/tech-stack-audit.md`](docs/tech-stack-audit.md)

### 1.1 Identify the actual technology stack

Inspect these files/directories wherever they exist:

- [x] `package.json`
- [x] `pnpm-lock.yaml` / lockfile
- [x] `vite.config.ts`
- [x] `tsconfig.json`
- [x] `vitest.config.ts`
- [x] `components.json` (shadcn/ui)
- [x] `drizzle.config.ts`
- [x] `client/src/`, `server/`, `shared/`, `client/public/assets/`
- [x] Existing tests and scripts
- [x] Environment variable names (no secret values)

**Confirmed stack:**

| Item | Finding |
|---|---|
| Framework | React 19.2.1 — CSR only |
| Build tool | Vite 7.3.7 |
| Language | TypeScript 5.9.3 (strict) |
| Router | Wouter 3.3.5 (patched) — `<Switch>` + `<Route>` |
| Rendering | Client-Side Rendering only. No SSR/SSG/ISR. |
| Styling | Tailwind CSS v4.1.14 + `tw-animate-css` + 118 KB monolithic `index.css` |
| Animation | `framer-motion` 12.23.22, `tailwindcss-animate`, custom CSS keyframes |
| State management | TanStack React Query 5.90.2 + tRPC 11.6.0. No Redux/Zustand. |
| UI components | shadcn/ui "new-york" style, 53 Radix UI components, Lucide React 0.453.0 |
| Image optimization | None — raw `<img>` tags, no optimization pipeline |
| Fonts | Google Fonts `Golos Text` via CSS `@import` in `index.css`. `<link preconnect>` commented out in HTML. |
| Package manager | pnpm 10.18.0 |
| Backend/API | Express 4.21.2 + tRPC middleware + OAuth routes |
| Database | MySQL via Drizzle ORM (unused locally — `DATABASE_URL` not set) |
| Tests | Vitest 2.1.4 — 2 server test files, 6 tests, zero client tests |
| Linting | Prettier 3.6.2 only. No ESLint config found. |
| Build commands | `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm check`, `pnpm test` |

**For Vite/React specifically:**
- [x] Route configuration — Wouter `<Switch>`, static imports, no lazy loading
- [x] Lazy-loaded routes — none
- [x] Suspense boundaries — none
- [x] Chunk splitting — none configured, single 917 KB bundle
- [x] Initial JavaScript bundle — 917 KB uncompressed, 218 KB gzip (**Issue B**)

**Deliverable**: ✅ `docs/tech-stack-audit.md` — full findings documented.

### 1.2 Establish the baseline

- [x] Review Git status — NOT a git repo (**Issue A**)
- [x] Inspect existing scripts and dependency versions
- [x] Dependencies already installed (pnpm node_modules present)
- [x] TypeScript check (`pnpm check`) — exit 0, no errors
- [x] Tests (`pnpm test`) — 6/6 pass
- [x] Production build (`pnpm build`) — exit 0, 917 KB JS bundle warning
- [x] Development server started — `http://localhost:3000` (still running)
- [x] All 8 routes return HTTP 200
- [x] Asset sizes recorded — hero JPEG 1.47 MB, total ~10.5 MB unoptimized
- [x] Existing warnings recorded (see tech-stack-audit.md section 6)

**Deliverable**: ✅ `docs/tech-stack-audit.md` sections 5–8.

### 1.3 Pre-implementation safety (Issue A)

Before any application code changes begin:

- ⬜ Check parent directories for any existing `.git` repo
- ⬜ Initialize Git in project root if none exists: `git init && git add -A && git commit -m "chore: baseline snapshot before audit changes"`
- ⬜ Confirm `git log --oneline` shows baseline commit
- ⬜ Record the commit hash as the safe rollback point in this document

**Note**: This must complete before Phase 3 implementation work begins.

---

## PHASE 2 — COMPREHENSIVE ORIGINAL WEBSITE AUDIT

**Status**: ⬜ Not started

**Reference**: <https://crackthecampus.com/>

> **Important**: This phase inspects the **original reference site** and the **local replica** separately. Do not assume original behavior — verify it directly in the browser. Issue G (Contact) requires reference verification here before any fix is planned.

### 2.1 Inspect every accessible route

Known routes to verify on the **original site**:

- [ ] `/` — full homepage
- [ ] `/institution` — institution landing
- [ ] `/explore` — course explorer
- [ ] `/pricing` — pricing tiers
- [ ] `/contest` — contest page
- [ ] `/download` — download page
- [ ] `/signup` — signup form
- [ ] `/login` — login (student/institution selector)
- [ ] `/documentation` — check if exists
- [ ] `/privacy` — check if exists
- [ ] `/terms` — check if exists
- [ ] **Contact** — click navbar Contact; record exact destination and behavior (**Issue G**)
- [ ] Any additional routes discovered via footer/button links

For each route, record:

- [ ] Initial render and loading behavior (speed, blank screen flash)
- [ ] Header and navigation (exact links, Contact behavior)
- [ ] Hero section (images, text, animations)
- [ ] Main content sections and ordering
- [ ] Cards, forms, buttons, interactive components
- [ ] Footer (links, contact section, social icons, map)
- [ ] Hover, focus, active, disabled states
- [ ] Responsive layout at 390px, 768px, 1440px
- [ ] Direct URL access and refresh behavior
- [ ] Browser Back/Forward behavior
- [ ] Console errors and failed network requests
- [ ] Internal and external navigation destinations

Also inspect the **local replica** at `http://localhost:3000` for the same routes and record differences.

### 2.2 Inspect all visible animations

Mandatory — do not skip. Inspect the **original site** section by section.

- [ ] Initial page-load and hero entrance animations
- [ ] Text reveal and staggered element animations
- [ ] Scroll-triggered section reveals
- [ ] Animated statistics and number counters
- [ ] Scrolling company logos / marquees (reference has two-row marquee with specific durations — see `reference-audit-notes.md`)
- [ ] Auto-rotating carousels and card transitions
- [ ] Hover animations on cards and buttons
- [ ] Navbar transitions, dropdowns, mobile-menu animations
- [ ] Background gradients, particles, floating elements, decorative motion
- [ ] Parallax / scroll-linked effects
- [ ] Accordion and FAQ transitions
- [ ] Modal, dialog, tooltip, and form transitions
- [ ] Loading indicators and skeleton screens
- [ ] Page-transition animations (original site behavior — does a branded overlay appear?)
- [ ] Footer and below-the-fold animations
- [ ] Reduced-motion behavior

For each animation record: location, trigger, duration/easing, run frequency, layout vs. compositor-only, stutter/CPU impact, mobile behavior, `prefers-reduced-motion` handling.

### 2.3 Create a reference inventory

- [ ] Create `docs/reference-audit.md` with findings
- [ ] Verified routes on original site
- [ ] Navigation destinations (especially Contact — **Issue G**)
- [ ] Page-by-page section inventory
- [ ] Interactive element inventory
- [ ] Animation inventory with timings
- [ ] Responsive observations (390px, 768px, 1440px)
- [ ] Broken or suspicious original-site behavior
- [ ] Reference screenshots where available
- [ ] Items that could not be verified
- [ ] Comparison table: original vs. local replica

---

## PHASE 3 — BUG DISCOVERY AND ROOT-CAUSE ANALYSIS

**Status**: ⬜ Not started

> This phase includes Issue E (slow navigation/white screens) root-cause investigation, Issue G (Contact) diagnosis in the replica, Issue H (client-side test gap) assessment, and any additional defects found during Phase 2.

### Issue report format

| Field | Value |
|---|---|
| **Issue ID** | |
| **Environment** | Original site / Local replica / Both |
| **Route & affected component** | |
| **Steps to reproduce** | |
| **Expected behavior** | |
| **Actual behavior** | |
| **Console/network evidence** | |
| **Severity & user impact** | |
| **Classification** | |
| **Suspected root cause** | |
| **Proposed fix** | |
| **Verification method** | |

**Classification options:**
- Confirmed defect
- Suspected defect (needs more testing)
- Performance bottleneck
- Accessibility issue
- Visual discrepancy
- Existing behavior to preserve

**Standard checks — reproduce in browser:**

- [ ] Broken/incorrect navbar destinations (especially Contact — **Issue G**)
- [ ] Dead buttons and links
- [ ] Duplicate content or components
- [ ] Missing images and fonts
- [ ] Incorrect route fallbacks
- [ ] JavaScript runtime errors in console
- [ ] Hydration errors
- [ ] Failed API requests
- [ ] Unhandled promise rejections
- [ ] Repeated network requests
- [ ] Incorrect loading states
- [ ] Unnecessary state updates
- [ ] Layout shifts (CLS contributors)
- [ ] Excessive animation work (jank, dropped frames)
- [ ] Mobile overflow and layout breakage
- [ ] White screen on navigation (**Issue E** — reproduce and record timeline)
- [ ] PageTransition overlay behavior — does it always fire 520ms? (**Issue E**)

**Specific investigations required:**

- [ ] **Issue E**: Open DevTools → Performance panel. Navigate Home → Explore → back → Pricing. Record URL-change to first-paint timeline. Confirm whether delay is bundle parse, render, or artificial timer.
- [ ] **Issue G**: Locate Contact element in local navbar. Inspect `href`, click handlers, and whether `PageTransition` intercepts hash links. Cross-reference against reference-site behavior found in Phase 2.
- [ ] **Issue H**: Assess Vitest + jsdom viability for client-side tests. Determine minimum test surface needed.

---

## PHASE 4 — FIX THE CONTACT NAVBAR ISSUE

**Status**: ⬜ Not started — awaiting Phase 2 reference verification

**Issue**: Issue G — Contact navbar behavior unverified against original.

> **Do not implement until Phase 2 confirms what the original Contact does.**

### Required steps

- [ ] Locate the navbar component in the local replica; inspect the Contact element
- [ ] Confirm original Contact behavior (scroll to `#contact`, external link, dedicated page, or other) — verified in Phase 2
- [ ] Inspect local replica's `href`, route definitions, click handlers, and section IDs
- [ ] Confirm whether `PageTransition.tsx` correctly excludes hash links (line 19 excludes `href.startsWith('#')` — verify in browser)
- [ ] Fix to match original behavior using the existing routing system
- [ ] Ensure mobile navbar Contact link behaves identically
- [ ] Verify keyboard accessibility and visible focus states on Contact link
- [ ] Confirm no unnecessary full-page reload triggered
- [ ] Test: direct URL access, Back/Forward, refresh, click from multiple pages

**Acceptance criteria**: Clicking Contact performs the verified original action — no blank screen, broken route, or unexpected full-page refresh.

---

## PHASE 5 — ELIMINATE WHITE SCREENS AND SLOW NAVIGATION

**Status**: ⬜ Not started

**Issues addressed**: Issue D (no lazy loading), Issue E (slow navigation/white screens)

> Fix root causes before adding loading UI. A spinner does not fix slow code.

### 5.1 Reproduce and identify the cause (Issue E)

For every affected route:

- [ ] Navigate from another page (measure time)
- [ ] Open directly in new tab (measure time)
- [ ] Refresh the route (measure time)
- [ ] Navigate backward and forward
- [ ] Repeat with Chrome network throttling (Slow 3G)
- [ ] Inspect browser console and Network panel waterfall
- [ ] Record URL-change-to-content-visible timeline
- [ ] Determine root cause: JS bundle parse time? Data fetch? Render time? Artificial timer? Error?

### 5.2 Fix the underlying routing problem (Issue D + E)

- [ ] Convert all page imports in `App.tsx` to `React.lazy(() => import('./pages/X'))`
- [ ] Wrap `<Switch>` in `<Suspense fallback={<PageTransition />}>` or a lightweight skeleton
- [ ] Verify `ErrorBoundary` still catches lazy-load failures
- [ ] Ensure all routes work with direct URL access after lazy loading is added
- [ ] Verify Back/Forward navigation works correctly
- [ ] Review `PageTransition.tsx` — make the 520ms delay conditional on actual load duration, not always-on
- [ ] Split oversized bundles where Vite `manualChunks` can help (framer-motion, recharts, etc.)

### 5.3 Implement visually consistent loading experience

- [ ] Inspect whether the original site shows a loading animation between routes
- [ ] If yes: reproduce the same visual style, colors, and timing in the replica
- [ ] If no: use a minimal, non-distracting fallback (e.g., preserve the existing CTC overlay but only when load takes >100ms)
- [ ] Keep layout stable while content loads (prevent CLS)
- [ ] Avoid completely white, unexplained screen
- [ ] Prevent loading indicators from flashing during fast transitions
- [ ] Avoid infinite loading states when an error occurs
- [ ] Provide a usable error/retry state when lazy loading fails
- [ ] Respect `prefers-reduced-motion`
- [ ] No fake progress percentages
- [ ] No artificial rendering delays

---

## PHASE 6 — PERFORMANCE AUDIT AND OPTIMIZATION

**Status**: ⬜ Not started

**Issues addressed**: Issue B (bundle), Issue C (hero image), Issue F (fonts), Issue I (CSS)

> Measure first. Optimize only based on evidence. Record before and after for every metric.

### 6.1 Establish measurable performance baselines

Run Lighthouse on **production build** served locally before any Phase 6 changes:

| Metric | Before | After |
|---|---|---|
| Lighthouse Performance score | | |
| LCP | | |
| INP (lab diagnostic) | | |
| CLS | | |
| FCP | | |
| TTFB | | |
| JavaScript transfer size (gzip) | 218 KB | |
| JavaScript uncompressed size | 917 KB | |
| CSS transfer size (gzip) | 34.7 KB | |
| Total transferred resources | | |
| Hero image transfer size | 1,466 KB | |
| Font load time | | |
| Initial route load time | | |
| Client-side navigation time | | |
| Production build time | 7.61s | |
| Console errors & failed requests | | |

### 6.2 Optimize images and assets (Issue C)

- [ ] Verify hero image dimensions and LCP contribution in Lighthouse
- [ ] Convert `hero-promo-office.jpg` to WebP at appropriate resolution
- [ ] Use `<picture>` element or CSS `background-image` with `image-set()` for WebP/JPEG fallback
- [ ] Convert badge PNGs to WebP: `badge-ctc-hero.png`, `badge-practice.png`, `badge-software.png`
- [ ] Convert institution JPEGs to WebP where quality permits
- [ ] Specify `width` and `height` attributes on `<img>` tags to prevent CLS
- [ ] Lazy-load below-the-fold images with `loading="lazy"`
- [ ] Mark hero/LCP image as `loading="eager"` (do **not** lazy-load it)
- [ ] Optimize SVG marquee logos (already small — verify no bloat)
- [ ] Remove unused assets only after verifying no dynamic references
- [ ] Avoid base64 embedding of large images

### 6.3 Optimize fonts and CSS (Issue F + Issue I)

- [ ] Restore `<link rel="preconnect" href="https://fonts.googleapis.com">` to `index.html`
- [ ] Restore `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` to `index.html`
- [ ] Verify `display=swap` is in the Google Fonts URL (it is — confirm in loaded CSS)
- [ ] Measure FCP before/after preconnect restoration
- [ ] Use Chrome Coverage panel to identify genuinely unused CSS in `index.css`
- [ ] Remove confirmed-dead rules (not interaction/responsive rules that appear unused)
- [ ] Verify Tailwind v4 content scanning covers all component files
- [ ] Do not split `index.css` into per-page files without clear architectural benefit
- [ ] Remove unused font weights only if confirmed unused (all 4 weights may be in use)
- [ ] Preserve all responsive states, animations, hover/focus styles

### 6.4 Optimize JavaScript and component rendering (Issue B + D)

- [ ] Inspect bundle composition with source-map or Vite bundle visualiser
- [ ] Identify top 5 heaviest dependencies in the bundle
- [ ] Apply route-level code splitting (done in Phase 5 — measure here)
- [ ] Use `build.rollupOptions.output.manualChunks` to separate vendor chunks (framer-motion, recharts, radix-ui)
- [ ] Remove or dynamic-import AWS SDK if confirmed unused in browser bundle
- [ ] Eliminate confirmed-unused dependencies from the initial load
- [ ] Apply `React.memo` / `useMemo` / `useCallback` only where profiling shows benefit
- [ ] Avoid large synchronous computations during initial render
- [ ] Record per-route bundle sizes after splitting

### 6.5 Optimize animations without removing them

- [ ] Prefer `transform` and `opacity` — audit `index.css` for `left`/`top`/`width`/`height` animations
- [ ] Verify marquee animation uses `transform: translateX()` (it does — confirm no layout animation)
- [ ] Avoid expensive `backdrop-filter` or `blur` animations if they cause measurable stutter
- [ ] Use `IntersectionObserver` for scroll-triggered animations instead of scroll event listeners
- [ ] Clean up event listeners, observers, rAF, and timers on component unmount
- [ ] Avoid continuous animations when element is off-screen (check marquee infinite loop behavior)
- [ ] Avoid permanent or excessive `will-change` declarations
- [ ] Prevent animations from restarting on component remounts
- [ ] Respect `prefers-reduced-motion` in all CSS animations and JS-driven motion
- [ ] Preserve all original animation appearances, timings, and interaction behaviors

### 6.6 Optimize navigation and network requests

- [ ] Identify render-blocking resources in Lighthouse (fonts, CSS)
- [ ] Inspect Network waterfall for duplicate requests and unnecessary waterfalls
- [ ] Reuse existing QueryClient caching; do not add redundant fetch calls
- [ ] Apply correct `Cache-Control` headers for static assets (images, fonts)
- [ ] Do **not** cache user-specific or sensitive data incorrectly
- [ ] Prefetch likely-next routes only for the most common user paths, not all
- [ ] Preserve all error handling, auth behavior, and stale-data semantics

### 6.7 Avoid unnecessary layout shifts

- [ ] Reserve space for hero image (CSS `aspect-ratio` or fixed `min-height`)
- [ ] Reserve space for marquee logos (fixed height container)
- [ ] Keep header dimensions stable on scroll
- [ ] Avoid injecting content above visible content without reserved space
- [ ] Avoid loading skeletons with dramatically different dimensions from final content
- [ ] CLS target: < 0.1

---

## PHASE 7 — CODE STRUCTURE AND MAINTAINABILITY

**Status**: ⬜ Not started

> Refactor only where justified. Bug fixes and performance come first.

**Review these after Phases 4–6 are complete:**

- [ ] Duplicate components and business logic
- [ ] Overly large components (Home.tsx is 18 KB — review if it needs splitting)
- [ ] Unnecessary prop drilling
- [ ] Inconsistent naming conventions
- [ ] Unused code (imports, variables, dead functions)
- [ ] Repeated API logic
- [ ] Incorrect `useEffect` dependency arrays
- [ ] Unnecessary effects
- [ ] Error handling gaps
- [ ] Type safety (any types, unsafe casts)
- [ ] Accessibility in component structure
- [ ] Component boundary clarity
- [ ] CSS organization (index.css is monolithic — assess splitting only if safe)
- [ ] Shared loading and error states

**Priorities**: Bug fixes → Performance → Refactoring (only when safe and justified). Do not change working behavior for cleanliness alone.

---

## PHASE 8 — RESPONSIVENESS AND ACCESSIBILITY

**Status**: ⬜ Not started

### Viewport verification

Test at each size on the local replica:

- [ ] Mobile: ~360–390 px
- [ ] Larger mobile: ~430 px
- [ ] Tablet: ~768 px
- [ ] Laptop: ~1366 px
- [ ] Desktop: ~1440 px+

### Checks

- [ ] Horizontal overflow at each viewport
- [ ] Broken layouts and text wrapping
- [ ] Mobile navigation (hamburger menu, Contact link behavior)
- [ ] Touch targets (minimum 44×44 px)
- [ ] Dropdown behavior
- [ ] Responsive images (not cropped unexpectedly)
- [ ] Card stacking behavior
- [ ] Typography scaling
- [ ] Modal and dialog positioning
- [ ] Footer layout (4-column → 2-column → 1-column collapse)
- [ ] Keyboard navigation (Tab order, Enter/Space interactions)
- [ ] Focus indicators (visible, meets WCAG 2.1)
- [ ] Semantic HTML (heading hierarchy, landmark regions)
- [ ] Accessible names for all interactive controls
- [ ] Color contrast (text on backgrounds)
- [ ] Reduced-motion behavior (`prefers-reduced-motion: reduce`)

**Note**: These are validation checks, not permission to redesign the layout.

---

## PHASE 9 — TESTING AND REGRESSION PREVENTION

**Status**: ⬜ Not started

**Issues addressed**: Issue H (no client-side tests)

### After each meaningful change

- [ ] Run `pnpm test` — all existing 6 server tests must continue to pass
- [ ] Run `pnpm check` — TypeScript must remain error-free
- [ ] Run `pnpm build` — production build must succeed
- [ ] Check browser console for new errors on all affected routes
- [ ] Verify affected routes manually in browser
- [ ] Compare visual output against reference screenshots
- [ ] Confirm animations and interactive behavior remain intact
- [ ] Re-run Lighthouse measurements under comparable conditions

### Create / update automated tests for (Issue H)

**Assess framework first:**
- [ ] Determine if Vitest + jsdom (or happy-dom) is sufficient for client tests
- [ ] Add `@testing-library/react` only if Vitest jsdom does not cover the needed surface
- [ ] Do **not** add Playwright/Cypress unless simpler options are inadequate

**Tests to add:**

- [ ] Navbar Contact link: verify it triggers scroll to `#contact` (or original behavior)
- [ ] All 8 routes load without error (direct URL + SPA navigation)
- [ ] Back/Forward navigation does not produce blank screens
- [ ] Lazy-load failure triggers ErrorBoundary (not silent blank)
- [ ] Loading indicators disappear when load completes
- [ ] Key buttons (`Start Upskilling`, `Get Started`, `Login`) render and are keyboard accessible
- [ ] Hero image renders (not broken `src`)
- [ ] Mobile nav toggle opens/closes correctly
- [ ] FAQ accordion expands/collapses correctly
- [ ] Existing 6 server tests: preserved and still passing

### Required regression checks (after every implementation phase)

- [ ] Home page renders correctly
- [ ] Every verified route opens correctly (8 routes)
- [ ] Contact performs its intended action
- [ ] No new white screens during normal navigation
- [ ] No unexpected full-page reloads for internal SPA navigation
- [ ] Loading indicators disappear when loading finishes
- [ ] Errors produce understandable recovery states, not permanent blank screens
- [ ] Existing animations and UI interactions remain functional
- [ ] Mobile and desktop layouts remain correct
- [ ] Existing functionality has not been silently removed

---

## PHASE 10 — FINAL VERIFICATION AND REPORT

**Status**: ⬜ Not started

### Produce: `docs/performance-audit-report.md`

**Sections:**

- [ ] **A. Actual technology stack** — Framework, language, routing, styling, animation, state management, build tools, key dependencies
- [ ] **B. Original website audit** — Verified routes, major sections, interactions, animations, inspection limitations
- [ ] **C. Issues discovered** — Severity, evidence, root cause, original vs. replica classification for each of Issues A–I and any new findings
- [ ] **D. Changes implemented** — Each file changed and why; categorized as: pre-flight safety / routing fix / bug fix / performance / refactoring
- [ ] **E. Before-and-after performance** — Comparable metrics table (populate from Phase 6.1 baseline and post-optimization measurements)
- [ ] **F. Final test results** — Passed / failed / unexecuted tests, remaining warnings, server test status
- [ ] **G. Remaining issues** — Unresolved bugs, limitations, recommended follow-up work
- [ ] **H. Final tech stack confirmation** — Actual framework and dependencies; any proposed dependency changes that were not made and why

---

## EXECUTION ORDER

Follow this order strictly. Do not skip or reorder phases.

1. ✅ Inspect existing repository and Git status — NOT a git repo (Issue A identified)
2. ✅ Identify real tech stack — React 19 + Vite 7 + Wouter + Express + tRPC + Tailwind v4
3. ✅ Run application locally and establish baseline — `http://localhost:3000`, all routes HTTP 200, build passes
4. ⬜ **[Safety: Phase 1.3]** Establish Git rollback before any code changes — `git init && git add -A && git commit` (Issue A)
5. ⬜ **[Phase 2]** Inspect original website routes, animations, and interactions — especially Contact behavior (Issue G)
6. ⬜ **[Phase 2]** Compare original with local replica — produce `docs/reference-audit.md`
7. ⬜ **[Phase 3]** Reproduce and classify issues — including white screens (Issue E) and Contact (Issue G)
8. ⬜ **[Phase 4]** Fix Contact navbar issue (Issue G) — after Phase 2 confirms correct behavior
9. ⬜ **[Phase 5]** Add lazy loading (Issue D) and fix white screens / slow navigation (Issue E)
10. ⬜ **[Phase 6]** Optimize images (Issue C), bundle (Issue B), fonts (Issue F), and CSS (Issue I) — measure before/after
11. ⬜ **[Phase 7]** Improve code structure only where justified — do not refactor working behavior
12. ⬜ **[Phase 8]** Verify responsiveness and accessibility at all breakpoints
13. ⬜ **[Phase 9]** Add client-side tests (Issue H), run all tests, linting, type checks, and production build
14. ⬜ **[Phase 9]** Run regression checks — all routes, Contact, animations, mobile layouts
15. ⬜ **[Phase 10]** Compare before-and-after performance metrics
16. ⬜ **[Phase 10]** Write final audit report at `docs/performance-audit-report.md`

---

## FINAL SUCCESS CRITERIA

- [ ] Existing framework and core functionality preserved
- [ ] Verified and documented technology stack (`docs/tech-stack-audit.md`) ✅
- [ ] Safe rollback mechanism established before any code changes
- [ ] Comprehensive reference-site audit (`docs/reference-audit.md`)
- [ ] Working Contact navbar action — verified against original behavior
- [ ] Faster and more reliable navigation — route-level lazy loading applied
- [ ] No reproducible blank-screen failures from fixed issues
- [ ] Appropriate loading and error states — not permanent or unexplained
- [ ] Preserved visual fidelity and all animations
- [ ] Improved performance supported by before-and-after measurements
- [ ] No avoidable regressions
- [ ] Successful production build and passing tests (all 6 server tests + new client tests), or precise explanation of any remaining failures
- [ ] Documented record of all changes and their verification (`docs/performance-audit-report.md`)

---

## ISSUE PHASE ASSIGNMENT SUMMARY

| Issue | Description | Investigation | Implementation | Verification |
|---|---|---|---|---|
| **A** | No Git repo | Phase 1 ✅ | Phase 1.3 (pre-code) | `git log` shows baseline commit |
| **B** | 917 KB JS bundle | Phase 1 ✅ → Phase 6 | Phase 5 + Phase 6 | Gzip bundle < 150 KB initial route |
| **C** | 1.47 MB hero JPEG | Phase 1 ✅ → Phase 6 | Phase 6 | Hero < 200 KB WebP, LCP improved |
| **D** | No lazy loading | Phase 1 ✅ → Phase 5 | Phase 5 | Per-route chunks in build output |
| **E** | White screens / slow nav | Phase 3 | Phase 5 | Navigation < 300ms, no white screen |
| **F** | Fonts via CSS `@import` | Phase 1 ✅ → Phase 6 | Phase 6 | Preconnect restored, FCP improved |
| **G** | Contact navbar behavior | Phase 2 + Phase 3 | Phase 4 | Matches original, no blank screen |
| **H** | No client-side tests | Phase 3 | Phase 9 | Contact + all routes + key UI tested |
| **I** | 118 KB monolithic CSS | Phase 1 ✅ → Phase 6 | Phase 6 | Dead rules removed, no visual regression |

---

*This document is the living reference for all phases. Update status markers (`⬜` → `✅`) as each task is verified. Do not mark future implementation tasks complete until they are actually done.*
