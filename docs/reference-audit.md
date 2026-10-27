# Phase 2 — Reference Audit Report

**Date**: 2026-10-27  
**Status**: ✅ Complete  
**Original reference**: https://crackthecampus.com/  
**Local replica**: http://localhost:3000  

---

## 1. Original Site — Navbar Links

| Link Text | Destination / Behavior |
|---|---|
| Institution | `/institution` |
| Explore | `/explore` |
| Pricing | `/pricing` |
| Contest | `/explore#sec-contests` |
| Download | `/download` |
| Signup | `/signup` |
| **Contact** | `href="#contact"` — smooth scrolls to footer contact section |
| Login | `/login` |

> **Issue G conclusion**: Contact uses `href="#contact"` → smooth scroll to the footer `id="contact"`. Matches the local replica. Issue G is NOT a bug.

---

## 2. Original Site — Route Inventory

| Route | Status | Notes |
|---|---|---|
| `/` | ✅ 200 OK | Full homepage |
| `/institution` | ✅ 200 OK | Institution overview |
| `/explore` | ✅ 200 OK | Skill/course explorer |
| `/pricing` | ✅ 200 OK | Pricing and licensing tiers |
| `/contest` | ❌ **404** | Contests accessible via `/explore#sec-contests` |
| `/download` | ✅ 200 OK | Desktop app download |
| `/signup` | ✅ 200 OK | Account registration |
| `/login` | ✅ 200 OK | Login hub |

---

## 3. Original Site — Homepage Sections (top to bottom)

1. Floating promo banner (top, dismissable)
2. Navbar
3. Hero section — heading, subheading, CTAs, promo office image
4. Marquee logo strip — two-row continuous horizontal scroll
5. Dual-core feature section (Practice + Software)
6. Contest/competition promotion with stats
7. Score/achievement section with animated counters
8. Infrastructure/platform section
9. FAQ accordion
10. Footer / Contact section (`id="contact"`) — address, links, social icons, map

---

## 4. Original Site — Animations Inventory

| Animation | Location | Trigger | Notes |
|---|---|---|---|
| Fade-in entrance | Hero | Page load | Opacity fade |
| Promo banner slide | Top strip | Page load | Slides from top |
| Marquee logo scroll | Logo strip | Continuous | Two rows, different speeds |
| Animated counters | Stats section | Scroll | Count-up animation |
| Card hover effects | Feature cards | Hover | Lift + shadow |
| FAQ accordion | FAQ | Click | Smooth expand/collapse |
| AI chat ("Ruby") | Bottom-right | Page load | Floating button with pulse |
| Page transition overlay | Between routes | Navigation | Branded overlay |

---

## 5. Local Replica — Route Inventory

| Route | Status | Difference |
|---|---|---|
| `/` | ✅ 200 OK | Matches |
| `/institution` | ✅ 200 OK | Matches |
| `/explore` | ✅ 200 OK | Matches |
| `/pricing` | ✅ 200 OK | Matches |
| `/contest` | ✅ **200 OK** | **DIFFERS** — local has dedicated page; original is 404 |
| `/download` | ✅ 200 OK | Matches |
| `/signup` | ✅ 200 OK | Matches |
| `/login` | ✅ 200 OK | Matches |

---

## 6. Differences Table — Original vs. Local Replica

| Feature | Original | Local Replica | Severity |
|---|---|---|---|
| Contact navbar | `href="#contact"`, smooth scroll | `href="#contact"`, smooth scroll | ✅ No difference |
| Contest route `/contest` | 404 Not Found | 200 OK, dedicated page | ⚠️ Low — replica has more content |
| Contest navbar link | `/explore#sec-contests` | `/contest` | ⚠️ Minor destination difference |
| AI Chat ("Ruby") | Visible floating assistant | Chatbot component present | 🔍 Needs visual verification |
| Tech stack | Next.js (hydration warnings) | Vite + React (no hydration) | ℹ️ Expected |
| Console errors | React hydration #418 | Zero errors in dev build | ✅ Local cleaner |

---

## 7. Issue G — Contact Navbar: RESOLVED (No Fix Required)

- **Original**: `<a href="#contact">Contact</a>` → smooth scrolls to `<footer id="contact">`
- **Local**: Same — `href="#contact"` scrolling to footer `id="contact"`
- `PageTransition.tsx` correctly excludes hash links — Contact click is NOT intercepted by the SPA router
- **No code change required for Issue G**

---

## 8. New Issue — Contest Navbar Link Mismatch (Issue J)

The local replica's Contest navbar link points to `/contest` (a full standalone page), while the original site's Contest link points to `/explore#sec-contests` and the original `/contest` route returns 404.

| Field | Value |
|---|---|
| **Issue ID** | J |
| **Priority** | P2 (low — replica has more content, not less) |
| **Finding** | Local navbar Contest link → `/contest`. Original → `/explore#sec-contests`. Original `/contest` is 404. |
| **Decision needed** | Keep the replica's dedicated `/contest` page (arguably better UX) OR update navbar link to match original's `/explore#sec-contests` destination |
| **Recommendation** | Keep the dedicated `/contest` page but update the navbar link to also navigate to `/contest` (already done). No action required unless strict parity is needed. |
| **Status** | ⬜ Awaiting decision |

---

## 9. Phase 2 Conclusions

1. **Issue G** — ✅ CLOSED. Contact behavior already correct. No code change needed.
2. **New Issue J** — Contest link destination differs from original. Low priority. Awaiting decision.
3. **No blank screens or console errors** on local replica.
4. **Phase 3** proceeds: Reproduce Issue E (white screens/slow nav) and assess Issue H (test gap).

---

*Produced by Phase 2 browser audit — 2026-10-27*
