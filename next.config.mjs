/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  compiler: {
    // Move reactRemoveProperties here instead of experimental
    reactRemoveProperties: { properties: ['^fdprocessedid$'] },
  },
};

export default nextConfig;
