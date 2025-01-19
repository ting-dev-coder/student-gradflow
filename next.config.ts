import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	env: {
		NEXT_PUBLIC_APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
	},
};

export default nextConfig;
