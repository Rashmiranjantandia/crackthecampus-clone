# CrackTheCampus Replica

A faithful client-side replica of [crackthecampus.com](https://crackthecampus.com/) — India's campus-to-career placement preparation platform.

Built as a full-stack web application using the Manus web-db-user starter template as a foundation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 7 |
| Routing | Wouter 3 (client-side SPA) |
| Styling | Tailwind CSS v4, custom CSS animations |
| Animations | Framer Motion |
| UI Primitives | Radix UI |
| Backend | Express 4, tRPC 11 |
| Database ORM | Drizzle ORM (MySQL) |
| Auth | Manus OAuth (JWT sessions) |
| Package Manager | pnpm 10 |

---

## Architecture

- **CSR SPA** — All routing is client-side via Wouter. Express serves the built `dist/public/` and handles `/api/trpc` and OAuth callbacks.
- **Route-level code splitting** — Each page is lazy-loaded via `React.lazy` + `Suspense`, reducing the initial bundle from ~917 kB to a ~27 kB entry chunk.
- **Vendor chunk splitting** — React, Radix UI, and TanStack/tRPC are separated into independently cacheable chunks.

---

## Setup

### Prerequisites

- Node.js 20+
- pnpm 10 (`npm i -g pnpm`)
- MySQL database (for auth and user tables)

### Install

```bash
pnpm install
```

### Environment variables

Create a `.env` file in the project root. The following variables are required for full functionality:

```env
# Database (MySQL)
DATABASE_URL=mysql://user:password@host:3306/dbname

# Manus OAuth platform (required for login/auth)
MANUS_PROJECT_ID=
MANUS_JWT_SECRET=
MANUS_OAUTH_API_URL=
MANUS_OAUTH_PORTAL_URL=

# Manus API (required for storage, LLM, and image generation features)
MANUS_API_URL=
MANUS_API_KEY=
MANUS_API_BROWSER_KEY=
```

> **Note:** The replica UI pages (homepage, explore, pricing, institution, contest, download) render without credentials. OAuth login, database, and Manus API integrations require the variables above.

---

## Scripts

```bash
pnpm dev          # Development server (Express + Vite HMR) on port 3000
pnpm build        # Production build: Vite client + esbuild server bundle
pnpm start        # Serve production build (dist/index.js)
pnpm check        # TypeScript type check (tsc --noEmit)
pnpm test         # Run tests (Vitest)
pnpm format       # Prettier formatting
pnpm db:push      # Generate and apply DB schema migrations
pnpm db:migrate   # Apply existing migrations only
```

---

## Project Structure

```
client/         React SPA source
  src/
    pages/      Route-level page components (lazy-loaded)
    components/ Shared UI components
    _core/      Auth hooks and platform utilities
server/         Express server
  _core/        Platform integrations (OAuth, storage, LLM, tRPC)
shared/         Types and constants shared between client and server
drizzle/        Database schema and migrations
docs/           Audit reports and master plan
```

---

## Reference

- Original website: [crackthecampus.com](https://crackthecampus.com/)
- Starter template: Manus `web-db-user` template (see [template.json](./template.json))
- Audit documentation: [docs/master-plan.md](./docs/master-plan.md)
