const path = require('path');
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const serverUrl = process.env.NEXT_PUBLIC_SERVER ? new URL(process.env.NEXT_PUBLIC_SERVER) : null;

module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	urbopack: {},
	images: {
		remotePatterns: serverUrl ? [
			{
				protocol: serverUrl.protocol.replace(':', ''),
				hostname: serverUrl.hostname,
				pathname: '/**',
			},
		] : [],
		deviceSizes: [640, 750, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		loader: 'default',
		minimumCacheTTL: 60 * 60 * 24 * 30,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	crossOrigin: 'anonymous',
	experimental: {
		esmExternals: true,
	},
	async rewrites() {
		return [
			{
				source: '/api-proxy/:path*',
				destination: `${process.env.NEXT_PUBLIC_SERVER}${process.env.NEXT_PUBLIC_API_BASE}:path*`,
			},
		];
	},
});