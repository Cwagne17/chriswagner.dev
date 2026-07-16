import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import packageJson from "./package.json";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.credly.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG ?? "cwagne17",
  project: process.env.SENTRY_PROJECT ?? "chriswagnerdev",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  release: {
    name: packageJson.version,
  },
  silent: !process.env.CI,
  widenClientFileUpload: true,
  webpack: {
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
