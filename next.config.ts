import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const nextConfig: NextConfig = {
  // NOTE: `output: 'export'` was removed on purpose. OpenNext needs a real
  // Next.js server build to bundle into a Cloudflare Worker; a static export
  // has no server to wrap.
  images: {
    // Images are served straight from the Workers static-asset bucket.
    // Turn this off only after enabling Cloudflare Images.
    unoptimized: true,
  },
};

export default nextConfig;

// Lets `next dev` reach Cloudflare bindings (env, KV, R2, ...) locally.
initOpenNextCloudflareForDev();
