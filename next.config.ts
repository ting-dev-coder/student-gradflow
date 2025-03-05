import type { NextConfig } from 'next';
const path = require('path');

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APPWRITE_DATABASE_ID:
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    NEXT_PUBLIC_APPWRITE_TODO_LIST_ID:
      process.env.NEXT_PUBLIC_APPWRITE_TODO_LIST_ID,
    NEXT_PUBLIC_APPWRITE_COUNTDOWN_ID:
      process.env.NEXT_PUBLIC_APPWRITE_COUNTDOWN_ID,
    NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID:
      process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID,
    NEXT_PUBLIC_APPWRITE_FOCUS_MIN_ID:
      process.env.NEXT_PUBLIC_APPWRITE_FOCUS_MIN_ID,
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;
