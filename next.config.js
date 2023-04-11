const { withSentryConfig } = require("@sentry/nextjs")

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: [
      "cdn1.epicgames.com",
      "placekitten.com",
    ],
  },
}

module.exports = withSentryConfig(
  nextConfig,
  { silent: true },
  { hideSourceMaps: true },
)
