/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "bot2.s3-sa-east-1.amazonaws.com",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
