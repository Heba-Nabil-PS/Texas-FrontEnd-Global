/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local assets in /public/assets are served statically; no remote domains needed.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
