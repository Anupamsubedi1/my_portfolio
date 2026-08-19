import { defineCloudflareConfig } from '@opennextjs/cloudflare';

export default defineCloudflareConfig({
  // Every route in this site is prerendered at build time (`○ (Static)`), and
  // there is no ISR / on-demand revalidation, so no incremental cache backend
  // is needed. OpenNext defaults to the "dummy" (no-op) cache, and Cloudflare's
  // CDN handles edge caching of the HTML.
  //
  // If you later add ISR or `revalidate`, install a real cache backend:
  //   import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
  //   export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
  // ...and add an R2 bucket binding named NEXT_INC_CACHE_R2_BUCKET in wrangler.jsonc.
});
