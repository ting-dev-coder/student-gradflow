import type { NextConfig } from 'next';
const path = require('path');

const nextConfig: NextConfig = {
  swcMinify: false,
  env: {
    NEXT_PUBLIC_APPWRITE_DATABASE_ID:
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    NEXT_PUBLIC_APPWRITE_TODO_LIST_ID:
      process.env.NEXT_PUBLIC_APPWRITE_TODO_LIST_ID,
    NEXT_PUBLIC_APPWRITE_COUNTDOWN_ID:
      process.env.NEXT_PUBLIC_APPWRITE_COUNTDOWN_ID,
    NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID:
      process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;
