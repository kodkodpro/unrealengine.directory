const { withSentryConfig } = require("@sentry/nextjs")

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placekitten.com",
      },
    ],
  },
}

module.exports = withSentryConfig(
  nextConfig,
  { silent: true },
  { hideSourceMaps: true },
)
