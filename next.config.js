/** @type {import('next').NextConfig} */
//https://ducanh-next-pwa.vercel.app/docs/next-pwa/configuring
const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  register: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  sw: 'service-worker.js',
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
})
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/settings',
        permanent: true,
      },
    ]
  },
  basePath: '/pixroom',
};

module.exports = withPWA(nextConfig)
