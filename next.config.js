
const path = require('path');
/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
	reactStrictMode: true,
	productionBrowserSourceMaps: true,
	urbopack: {},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'headless.t3api.com',
				pathname: '/**',
			},
		],
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
	 
});