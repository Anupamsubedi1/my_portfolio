# Deploying to Cloudflare Workers

This site runs as a Cloudflare Worker via the [OpenNext](https://opennext.js.org/cloudflare)
adapter. It is **not** a static export — Next.js builds a real server, and OpenNext
bundles that server into a Worker with the static files served from Workers Assets.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Next.js dev server (fast refresh). Day-to-day development. |
| `npm run preview` | Builds and runs the real Worker locally in `workerd`. Use before deploying. |
| `npm run deploy` | Builds and deploys to Cloudflare. |
| `npm run cf-typegen` | Regenerates `cloudflare-env.d.ts` from the bindings in `wrangler.jsonc`. |

`npm run dev` runs the site under Node, not `workerd`. It is the fastest loop, but
only `npm run preview` proves the thing you are about to ship actually works.

## First deploy

```bash
npm run deploy
```

Wrangler opens a browser to authenticate, then:

1. Uploads the Worker + 39 static assets.
2. Creates the Custom Domain `anupamsubedi.com.np`, including its DNS record and
   TLS certificate.

The apex currently has no DNS record, so there is nothing to conflict with. TLS
issuance takes a few minutes on first setup — a certificate error immediately
after the first deploy is expected and resolves itself.

## The www redirect (one-time, manual)

The canonical host is the **apex** `anupamsubedi.com.np`. Every URL in the app —
the canonical tag, `metadataBase`, OpenGraph and Twitter tags, `sitemap.xml`,
`robots.txt`, and the JSON-LD `@id` — points there.

`www.anupamsubedi.com.np` already has proxied A/AAAA records but currently serves
a 404. It is deliberately **not** a Worker route, so it never reaches this Worker.
Instead, redirect it at the zone level:

1. Cloudflare dashboard → select the `anupamsubedi.com.np` zone.
2. **Rules → Redirect Rules → Create rule**.
3. Name it `www to apex`.
4. Match: **Custom filter expression**
   - Field `Hostname`, Operator `equals`, Value `www.anupamsubedi.com.np`
5. Then: **Dynamic redirect**
   - Expression: `concat("https://anupamsubedi.com.np", http.request.uri.path)`
   - Status code: `301`
   - Check **Preserve query string**.
6. Deploy the rule.

Verify:

```bash
curl -sI https://www.anupamsubedi.com.np | head -3   # expect 301 -> apex
curl -sI https://anupamsubedi.com.np     | head -3   # expect 200
```

Keeping www off the Worker means there is exactly one host that can serve the
site, so the canonical tag and what the server actually returns can never disagree.

## Caching

`open-next.config.ts` uses OpenNext's default no-op incremental cache. That is
correct **because every route here is prerendered at build time** (`○ (Static)`)
and nothing revalidates. Cloudflare's CDN caches the HTML at the edge.

If you ever add ISR, `revalidate`, or on-demand revalidation, the no-op cache
will silently stop persisting anything. At that point switch to R2:

```ts
import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
```

...and add an R2 bucket binding named `NEXT_INC_CACHE_R2_BUCKET` in `wrangler.jsonc`.

Do **not** use `static-assets-incremental-cache` here. It is read-only, and the
build does not populate `assets/cdn-cgi/_next_cache/`, so every request logs
`Failed to set to read-only cache` while still rendering correctly — noisy logs
for no benefit.

## Images

`next.config.ts` sets `images.unoptimized: true`, so `next/image` serves the
original files straight from Workers Assets. No image-optimization service is
involved and nothing can fail at runtime.

To get real optimization you need Cloudflare Images enabled on the account; then
remove the `unoptimized` flag. The travel gallery is the bulk of the payload, so
that is where the win would be.

## Animations

Each section in `components/` owns its own framer-motion animation (`motion`
plus `useInView`), and each declares `'use client'` at the top. `app/page.tsx`
just composes them in order. `components/ScrollProgress.tsx` draws the gradient
read-progress bar pinned to the top of the viewport.

### three.js hero (`components/HeroCanvas.tsx`)

A drifting node field joined by links that brighten as nodes approach — written
against raw `three` with custom GLSL rather than react-three-fiber, which would
have added ~150 KB gzipped of reconciler for a single scene.

It **must** stay dynamically imported:

```ts
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });
```

three.js is a **519 KB** chunk (~130 KB gzipped) — larger than the rest of the
site's JavaScript combined. `ssr: false` both keeps it off the critical path and
keeps `WebGLRenderer` out of the server render, where `document` does not exist.
A plain `import` breaks both, and the build still succeeds — you would only
notice as a slower first paint. Check it stayed split:

```bash
curl -s http://localhost:8788/ | grep -c "WebGLRenderer"   # expect 0
```

The scene degrades by itself: no-ops without WebGL, renders a single static
frame under `prefers-reduced-motion`, drops from 108 to 58 nodes under 768px,
and parks its `requestAnimationFrame` loop via `IntersectionObserver` once the
hero scrolls away. It also repaints on theme change via a `MutationObserver` on
`<html class>`, and disposes every geometry, material and the renderer on
unmount. Keep those guards.

Node motion is integrated on the CPU, not displaced in the vertex shader —
shader-side drift would leave the link geometry anchored to stale positions.

Animated elements are server-rendered with `opacity:0` and become visible when
framer-motion hydrates. `app/layout.tsx` carries a `<noscript>` rule that forces
them visible if JavaScript never runs, so the content stays readable and
indexable.

## Do not add 'use client' to app/page.tsx

`app/page.tsx` must stay a **server** component. It exports `metadata`, and
Next.js only allows that from server components — adding the directive drops the
page-level SEO **silently**, with no error and a successful build.

It does not need the directive: every section component already declares its own
`'use client'`. Keep interactivity in `components/`, never in the page.

## Continuous deployment (Workers Builds)

Push to `main` → Cloudflare builds and deploys automatically. One-time setup:

1. Cloudflare dashboard → **Compute (Workers) → my-portfolio → Settings → Builds**.
2. **Connect** → authorise GitHub → pick `Anupamsubedi1/my_portfolio`.
3. Settings:
   - **Git branch**: `main`
   - **Build command**: `npx opennextjs-cloudflare build`
   - **Deploy command**: `npx wrangler deploy`
   - **Root directory**: *(blank)*
4. Save. Every push to `main` now builds and deploys.

The Worker name in the dashboard **must** match `name` in `wrangler.jsonc`
(`my-portfolio`) or the deploy step fails.

Two repo details make CI reproducible, and both are easy to undo by accident:

- **`package-lock.json` is committed** (it used to be gitignored). Workers Builds
  runs `npm ci`, which requires a lockfile; without it every build re-resolves
  dependencies and a floating minor version can break a deploy that worked
  yesterday.
- **`.node-version` pins Node 24**, matching the Workers Builds default. Pinning
  means a future change to their default cannot silently change your build.

This project needs no build variables. If you ever add `NEXT_PUBLIC_*` env vars,
they must be set under **Build Variables and Secrets** — they are inlined at
build time, so runtime vars alone are not enough.

### Verifying a clean build locally

CI builds from a fresh checkout, so a build that only works in your working
directory will fail there. Reproduce it exactly:

```bash
git clone --branch main <repo-url> /tmp/ci-test
cd /tmp/ci-test
npm ci
npx opennextjs-cloudflare build
npx wrangler deploy --dry-run
```

If that passes, Workers Builds will pass.
