# Question Mart & Cafe — Project Handoff

**Prepared:** 2026-09-22  
**Repository state at handoff:** uncommitted Phase 2/3 work is present; see [Working-tree state](#working-tree-state). This document describes the repository as inspected, not a deployed system.

## 1. PROJECT OVERVIEW

Question Mart & Cafe is a luxury coffee-shop platform with a customer web application, an administrative web application, a Node API, and an early Electron desktop shell. Its intended capabilities are menu/catalogue management, customer authentication, ordering, reservations, reviews, branches, and a loyalty/rewards programme. The currently usable customer experience is focused on login and loyalty/reward redemption; the backend exposes a wider domain API than either web UI currently uses.

The project is an **MVP/prototype transitioning toward production configuration**. The explicitly stated current phase is **Phase 3 — Production Environment Configuration**. Firebase/FCM was removed before this handoff and must not be reintroduced unless the owner explicitly changes direction.

## 2. TECH STACK

### Repository layout and runtimes

- **Root:** npm command wrapper only; this is *not* an npm-workspaces monorepo.
- **Backend (`backend/`):** TypeScript compiled to CommonJS/ES2020, Node.js `>=18`, Express REST API.
- **Customer (`frontend-customer/`):** TypeScript + React single-page application, Vite development/build tooling.
- **Admin (`frontend-admin/`):** TypeScript + React SPA, Vite, Tailwind CSS/PostCSS.
- **Desktop (`desktop/`):** Electron + TypeScript placeholder that loads the admin development server.
- **Database:** MongoDB through Mongoose. The intended production cluster is MongoDB Atlas `question-mart-cluster`, database `questionmartcafe`; local development is `127.0.0.1`/`localhost` and must remain unchanged.

### Key packages declared in manifests

| Area | Packages |
| --- | --- |
| Backend | `express ^4.19.2`, `mongoose ^9.7.4`, `mongodb ^7.5.0`, `dotenv ^16.4.5`, `jsonwebtoken ^9.0.2`, `bcryptjs ^2.4.3`, `cors ^2.8.5`, `helmet ^7.1.0`, `express-validator ^7.1.0`, `morgan ^1.10.0`; development: `typescript ^5.9.3`, `ts-node ^10.9.2`, `ts-node-dev ^2.0.0`, `nodemon ^3.1.14`. |
| Customer | `react/react-dom ^18.3.1`, `react-router-dom ^6.25.1`, `axios ^1.7.2`, `react-query ^3.39.3`; development: Vite `^5.3.5`, React Vite plugin `^4.3.1`, TypeScript declared as `^7.0.2`. |
| Admin | `react/react-dom ^18.3.1`, `react-router-dom ^6.25.1`, `axios ^1.7.2`, `react-query ^3.39.3`, TypeScript `^5.5.4`; development: Vite `^5.3.5`, React Vite plugin `^4.3.1`, Tailwind `^3.4.1`, PostCSS `^8.4.35`, Autoprefixer `^10.4.17`. |
| Desktop | Electron `^31.3.0`, Axios `^1.7.2`, TypeScript `^5.9.3`, `ts-node ^10.9.2`, `ts-node-dev ^2.0.0`. |

### External services and integrations

- **MongoDB Atlas:** intended production database service.
- **Railway:** backend target only; backend documentation specifies its configuration.
- **No payment gateway, email/SMS provider, object-storage provider, or external analytics service** is implemented in the inspected code.
- **Firebase/FCM:** removed; no Firebase references were found in source/configuration scans.

## 3. FILE STRUCTURE

`node_modules/`, `.git/`, and build output directories are excluded below. Lockfiles are omitted from the tree for readability but exist in each package directory.

```text
questionmartcafe_v1/
├── README.md                         # High-level local development instructions
├── package.json                      # Convenience scripts for starting subprojects
├── .gitignore                        # Ignores .env, dependencies, dist/build output
├── backend/                          # Express/Mongoose REST API
│   ├── .env.example                  # Backend environment-variable template
│   ├── README.md                     # API, environment, and Railway notes
│   ├── package.json                  # Backend build/start/dev/seed scripts
│   ├── tsconfig.json                 # Emits src/ to dist/
│   ├── swagger.json                  # API documentation specification
│   ├── postman-collection.json       # Postman requests for the API
│   └── src/
│       ├── app.ts                    # Express middleware, health endpoint, route mounting
│       ├── server.ts                 # Listen, DB startup, signal handling
│       ├── config/                   # Env validation and Mongo connection
│       ├── controllers/              # HTTP handlers for every domain module
│       ├── routes/                   # Endpoint-to-controller and auth/role mapping
│       ├── models/                   # Mongoose schemas: User through Branch
│       ├── middleware/               # JWT auth, RBAC, rate limiter, error handling
│       ├── data/                     # Seed catalogue/category data
│       ├── scripts/                  # Development seed/admin/password-reset utilities
│       ├── types/                    # Shared API/domain TypeScript declarations
│       └── utils/                    # JWT, ObjectId, loyalty, sanitisation helpers
├── frontend-customer/                # Customer-facing Vite/React SPA
│   ├── .env.example                  # Vite API/title/environment variables
│   ├── package.json / vite.config.ts # Build scripts; local port 3000
│   ├── CONVENTIONS.md                # Naming/import/style conventions
│   ├── FOUNDATION_REPORT.md          # Original frontend foundation notes
│   ├── LOYALTY_IMPLEMENTATION_REPORT.md # Loyalty implementation notes
│   └── src/
│       ├── App.tsx / main.tsx        # Router and provider composition
│       ├── pages/auth/               # Customer login view
│       ├── pages/loyalty/            # Only implemented customer feature page
│       ├── components/loyalty/       # Loyalty UI components/modal/states
│       ├── context/                  # Authentication and language/RTL state
│       ├── services/                 # Axios wrapper and loyalty API calls
│       ├── constants/                # API endpoints, routes, theme/domain constants
│       ├── types/                    # Client-side domain types
│       └── styles/                   # Tokens, reset, global and animation CSS
├── frontend-admin/                   # Administrative Vite/React SPA
│   ├── .env.example                  # Vite API/title/environment variables
│   ├── package.json / vite.config.ts # Build scripts; local port 3001
│   ├── tailwind.config.cjs           # Tailwind content/theme setup (untracked at handoff)
│   ├── postcss.config.cjs            # PostCSS/Tailwind/Autoprefixer setup (untracked)
│   └── src/
│       ├── App.tsx / main.tsx        # Auth-protected router and bootstrap
│       ├── context/                  # Separate admin-token authentication state
│       ├── components/               # Button/input/state components and route guard
│       ├── layouts/                  # Sidebar, header, authenticated layout shell
│       ├── pages/auth/               # Admin login page
│       ├── pages/dashboard/          # Placeholder “under construction” page
│       ├── services/                 # Axios wrapper/request helpers
│       ├── constants/ and types/     # Endpoint constants and mirrored domain types
│       └── styles/                   # Tailwind entrypoint plus CSS tokens/reset
└── desktop/                          # Incomplete Electron wrapper
    ├── .env.example                  # Contains API base URL variable only
    ├── package.json / tsconfig.json  # Electron scripts and compiler settings
    └── src/
        ├── main/main.ts              # Creates a BrowserWindow loading localhost:3001
        └── preload/preload.ts        # Empty, safe contextBridge API placeholder
```

## 4. ARCHITECTURE & KEY DECISIONS

### Request/data flow

```text
Customer SPA (port 3000) ─┐
                           ├─ HTTPS/JSON + Bearer JWT ─> Express API ─> Mongoose ─> MongoDB Atlas
Admin SPA (port 3001) ────┘                                      │
                                                                  └─ role middleware: admin/super_admin
Electron shell (early) ────────────────> loads the admin SPA at http://localhost:3001
```

1. Both React apps construct absolute endpoints from `VITE_API_BASE_URL` in their respective `src/constants/api.ts` files. Their Axios instances set JSON headers and attach a locally stored Bearer token.
2. `backend/src/app.ts` mounts `/health` and all `/api/*` routers. `backend/src/server.ts` listens first, then runs `connectDB()`; connection failure logs and exits the process.
3. `middleware/auth.ts` verifies the JWT, looks up the user, attaches `req.user`; `middleware/authorize.ts` checks roles. The API enforces authorization server-side—admin UI checks are only a convenience gate.
4. Controllers use Mongoose models directly. Most business validation resides in controllers and Mongoose schemas rather than a separate service layer.

### Key decisions already made

- **Two separate web SPAs:** customer and admin are independent Vite builds, not routes inside one frontend. They therefore have separate build variables and separate browser storage keys (`auth_*` vs `admin_auth_*`).
- **JWT in localStorage:** tokens are returned by `/api/auth/login` and stored in browser localStorage. Requests add `Authorization: Bearer <token>`; there is no cookie/session or token-refresh endpoint. Example from both Axios request interceptors:

  ```ts
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  ```

- **Backend RBAC model:** roles are `customer`, `staff`, `admin`, and `super_admin`. Administrative mutations require `admin` or `super_admin`; the admin SPA rejects non-admin login responses as a second line of UI protection.
- **Bilingual/RTL intent:** domain data models hold `{ en, ar }` fields. Customer `ThemeContext` persists the preferred language, sets `document.documentElement.lang` and `dir`, and supports RTL. However, many Arabic literals currently display mojibake in the source files and must be encoding-checked before release.
- **Loyalty rules:** `calculateMembershipLevel()` establishes Bronze `<1000`, Silver `1000–2499`, Gold `2500–4999`, Platinum `>=5000`. Loyalty accounts are lazy-created by `getMyLoyalty()` and admin loyalty lookups; QR identifiers are generated as `QMC-<timestamp>-<random>`.
- **Production backend hardening completed in the current dirty worktree:** `config.host` is `0.0.0.0`; the backend reads Railway `PORT`; production trusts one reverse proxy; `FRONTEND_URL` is parsed as a comma-separated exact CORS allowlist; graceful shutdown disconnects Mongoose. These changes have not yet been committed.
- **No Firebase:** removal is a project constraint already completed. Do not add Firebase/FCM configuration casually.

### Repeated conventions

- Files are feature-grouped under `pages`, `components`, `services`, `context`, `constants`, and `types`.
- API endpoints are centrally defined in `constants/api.ts`; HTTP calls go through Axios request helpers (`get`, `post`, `put`, `patch`, `del`).
- Backend is organised by domain: model → controller → router, with auth/RBAC middleware placed at routes.
- Customer-specific code conventions are documented in `frontend-customer/CONVENTIONS.md`: PascalCase components, camelCase utilities/hooks, named exports, centralized type/constant exports, and ordered imports.

## 5. WHAT'S DONE

### Backend API: implemented, not independently test-verified in this handoff

The backend has concrete Mongoose schemas, route wiring, controller functions, input/error handling, JWT authentication, and role checks for these functional areas:

- **Authentication/user profile:** `register`, `login`, `getMe` in `controllers/authController.ts`; `getProfile`/`updateProfile` in `userController.ts`. Passwords are bcrypt-hashed and user roles are included in signed JWTs.
- **Catalogue:** public product/category reads; admin CRUD. Models support bilingual name/description, category relationships, sizes/prices, availability, featured/display fields, and indexes.
- **Orders:** authenticated creation and personal history; admin listing/status changes. The controller obtains product data server-side to calculate order amounts rather than relying only on client-supplied item values.
- **Reservations and reviews:** authenticated customer creation/personal access and restricted admin workflow; review approval is admin-only.
- **Branches:** public reads and admin-only CRUD/status updates, including a `2dsphere` location index.
- **Loyalty/rewards:** customers can fetch/lazy-create their loyalty account, view active rewards, redeem when points are sufficient, and view redemption/transaction history. Admin routes can manage rewards and update customer points, tier, and QR code.
- **Operational basics:** JSON parsing, Helmet, per-route in-memory rate limiting (100 requests/IP/path/15 min; login/register additionally 5/15 min), a health endpoint, error handling, and documented Postman/Swagger artifacts.

The claim above means **implemented in source and routed**. There are no unit/integration test scripts or test files in the package manifests, so no automated test suite is present to establish runtime verification.

### Customer frontend: implemented loyalty vertical slice

- `/login` implements password login via `AuthContext.login()` and redirects authenticated users to `/loyalty`.
- `/loyalty` in `pages/loyalty/LoyaltyPage.tsx` loads loyalty account, available rewards, and redemption history in parallel; renders tier progress/QR/reward cards; opens a confirmation modal; calls `redeemReward()` and refreshes history.
- The page redirects unauthenticated users to login and gives loading, empty, and error/retry states.
- Customer auth persistence, Axios token injection, English/Arabic language selection, document direction, design tokens, responsive styling, and reduced-motion guidance are present.

### Admin frontend: implemented authenticated shell

- `/login` submits to the same backend login endpoint but accepts only `admin`/`super_admin` roles.
- `ProtectedRoute` protects the authenticated layout and redirects unauthenticated/non-admin users.
- The dashboard layout, header/logout action, Tailwind styles, and one placeholder `/dashboard` route render. This is a shell, not a management system yet.

## 6. WHAT'S IN PROGRESS / BROKEN / INCOMPLETE

### Product gaps

- **Customer frontend scope is narrow:** only login and loyalty routes are mounted in `frontend-customer/src/App.tsx`. The route constants describe menu, registration, ordering, reservations, profile, etc., but no corresponding screens are mounted/implemented.
- **Admin is largely a placeholder:** `DashboardPage.tsx` says “Dashboard Under Construction”; every sidebar item except Dashboard is explicitly `disabled: true`. Backend CRUD exists but admin UI screens/services for it do not.
- **Desktop app is incomplete/broken:** it only loads `http://localhost:3001`, has no production packaging configuration, and its `dev` script says `ts-node-dev src/main.ts` even though the entry file is `src/main/main.ts`. It will not serve as a production desktop client without work.
- **Production deployment is not complete:** no final Railway URL or customer/admin deployment origins are recorded, no frontend host configuration is present, and neither frontend has a production `VITE_API_BASE_URL` supplied. The current fallback is `http://localhost:5000`, which breaks deployed browsers.
- **Arabic text encoding needs repair/verification:** examples in `LoyaltyPage.tsx`, `LoginPage.tsx`, sidebar labels, and seed data are visibly mojibake (for example `Ø¨Ø±Ù†Ø§Ù…Ø¬...`) in repository source. The intended Arabic/RTL support is therefore not release-ready.
- **No automated tests or CI:** `rg` found no test framework/scripts and no CI workflow configuration. Build/runtime health has not been independently executed during this handoff.
- **Rate-limit scalability:** `middleware/rateLimiter.ts` uses an in-memory process-local object. It resets on restart and is not shared across Railway instances; this is acceptable for a prototype but not a distributed production rate limiter.
- **No upload/image pipeline:** schemas accept optional image strings; there is no storage/upload implementation.
- **No payment integration:** order payment methods/statuses are data fields only; no card/wallet payment provider is called.
- **Development-only scripts can affect whichever URI is in `.env`:** seed and password-reset scripts default to local MongoDB but honour `MONGODB_URI`. `seedAdmin.ts` contains known demo credentials and must never be run against production.

### TODO/FIXME scan

A repository-wide source scan for `TODO`, `FIXME`, `XXX`, and `HACK` returned **no matches**. The product gaps above are inferred from current routes/components and explicit “Coming Soon” UI—not hidden TODO comments.

## 7. ENVIRONMENT & CONFIG

### Local startup

Install dependencies separately in each application folder (or run the root `npm run install:all` convenience script), then use these root scripts in separate terminals:

```powershell
npm run dev:backend     # backend, normally http://localhost:5000
npm run dev:customer    # Vite customer SPA, normally http://localhost:3000
npm run dev:admin       # Vite admin SPA, normally http://localhost:3001
```

Backend production commands are run from `backend/`:

```powershell
npm run build           # tsc -> backend/dist
npm start               # node dist/server.js
```

### Backend variables (`backend/.env`)

`backend/src/config/env.ts` validates these at process startup:

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB URI. Local default/template: `mongodb://localhost:27017/questionmartcafe`; production must target Atlas cluster/database `questionmartcafe`. |
| `JWT_SECRET` | Yes | Token signing secret. Production rejects documented placeholder values. |
| `JWT_EXPIRE` | Yes | JWT duration matching `^\\d+[smhd]$`, e.g. `30d` or `1h`. |
| `NODE_ENV` | Recommended / required operationally in production | Must be `production` on Railway to enable proxy/CORS/security behavior. Defaults to `development`. |
| `PORT` | No locally | Defaults to 5000. Railway injects this; do not hard-code a Railway port. |
| `FRONTEND_URL` | Required when `NODE_ENV=production` | Comma-separated, exact customer and admin origins for CORS, e.g. `https://customer.example,https://admin.example`. No wildcard. |

The backend deliberately binds `0.0.0.0`. Its production connection forces IPv4 (`family: 4`) and uses a 30-second Mongo server-selection timeout.

### Vite frontend variables

Each frontend reads:

```dotenv
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_TITLE=Question Mart & Cafe
VITE_APP_ENV=development
```

`VITE_API_BASE_URL` is the important runtime configuration. Vite replaces `import.meta.env.VITE_*` **during its build**, so this variable must be set in each frontend host's **build-time environment**, before `npm run build`. It is intentionally public browser configuration, so it must contain the public HTTPS Railway API origin—not credentials. `VITE_APP_TITLE` and `VITE_APP_ENV` are typed/documented but currently not meaningfully consumed by the inspected application code.

### Railway/backend production target

The backend README specifies:

- Railway service root directory: `backend/`
- Build command: `npm run build`
- Start command: `npm start`
- Node version: `>=18`
- Railway service variables: `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `NODE_ENV=production`, `FRONTEND_URL`; Railway supplies `PORT`.

Atlas details supplied by the owner: intended cluster is `question-mart-cluster`, production DB is `questionmartcafe`, and application database username is `questionmartapp`. Network allowlist entries are `196.136.145.101/32`, `0.0.0.0/0`, and `196.136.174.105/32`; **do not change them**. The `0.0.0.0/0` entry means Railway is not currently blocked by its egress IP, but the app user still needs at least `readWrite` on `questionmartcafe`. This repository cannot inspect or prove Atlas user privileges.

### Gotchas

- `.env` is ignored; do not commit real credentials. `.env.example` files are templates, not production configuration.
- `FRONTEND_URL` must contain frontend origins only (scheme + host + optional port), not API paths. It must match the actual browser `Origin` values exactly.
- A deployed browser cannot use `localhost`; both Vite builds require the final Railway public URL.
- CORS uses `credentials: true`, but the current auth transport is Bearer tokens rather than cookies.
- The current repo has no frontend deployment manifest. The host must publish the Vite `dist/` directory and support SPA fallback routing.
- Do not modify Firebase/FCM, local Mongo configuration, or Atlas network rules as part of Phase 3 unless the owner changes the constraints.

## 8. OPEN QUESTIONS / NEXT STEPS

### Immediate Phase 3 decisions required from the owner

1. Provide the real public Railway backend URL once the service domain is created.
2. Decide and provide the final customer and admin frontend origins/hosts. Do not guess them.
3. In Railway, set the required production values listed above, including an Atlas URI for `questionmartapp`/`questionmartcafe` and a strong new `JWT_SECRET`; confirm `questionmartapp` has `readWrite` on the intended database.
4. In each selected frontend host, set `VITE_API_BASE_URL` to the exact public Railway URL at build time, configure build command `npm run build`, and publish `dist/`.
5. Put both final frontend origins in Railway `FRONTEND_URL`, comma-separated, then smoke-test `/health`, login, authenticated loyalty read, and a browser CORS request from each frontend.

### Product/engineering next work after configuration

- Repair UTF-8 Arabic strings/seed content and visually test RTL.
- Build customer menu/catalogue, registration, ordering, reservations, profile, review, and navigation routes that the backend already supports.
- Replace the admin dashboard placeholder with real management modules, beginning with loyalty/rewards or the highest operational priority.
- Add integration tests for authentication/RBAC, order totals, reward redemption/point integrity, and production CORS, then add CI.
- Decide whether Electron is in scope. If it is, correct its script/entrypoint, remove its hard dependency on a local Vite URL, define IPC/API boundaries, and establish packaging/release design.
- Design production logging, a shared rate-limit store, upload/image hosting, payment processing, and secret rotation before calling the system fully production-ready.

### Unresolved implementation/design questions

- Which frontend hosting provider(s) will be used, and will customer/admin live on separate origins?
- How will the first production admin/super-admin account be provisioned safely? Existing seed credentials are development-only.
- Is `staff` intended to receive any API/UI access beyond being a defined role?
- How should order payment, fulfilment notifications, images, and notifications be integrated? None has an implemented provider today.
- Should loyalty point earning happen automatically from completed orders? The model allows an `earn` transaction type, but inspected order flows do not establish an automatic earning policy.

## Working-tree state

Before this handoff file was added, Git showed the following existing changes; preserve/review them rather than discarding them:

```text
Modified: backend/.env.example
Modified: backend/README.md
Modified: backend/package.json
Modified: backend/src/app.ts
Modified: backend/src/config/database.ts
Modified: backend/src/config/env.ts
Modified: backend/src/server.ts
Modified: frontend-admin/package-lock.json
Modified: frontend-admin/package.json
Modified: frontend-admin/src/styles/index.css
Untracked: frontend-admin/postcss.config.cjs
Untracked: frontend-admin/tailwind.config.cjs
```

These backend changes correspond to the Railway/production preparation described above. The admin changes add Tailwind/PostCSS setup and styling. This handoff file is an additional uncommitted documentation change.
