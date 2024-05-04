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
  basePath: '/pixroom',
})
const nextConfig = {}

module.exports = withPWA(nextConfig)
