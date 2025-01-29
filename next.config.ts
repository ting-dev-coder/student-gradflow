import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
	env: {
		NEXT_PUBLIC_APPWRITE_DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
};

export default nextConfig;
