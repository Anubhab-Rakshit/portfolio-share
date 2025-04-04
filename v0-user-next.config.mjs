/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode to prevent double-rendering of animations
  images: {
    domains: ['localhost', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Transpile specific packages that might cause issues
  transpilePackages: ['canvas-confetti'],
  // Webpack configuration to handle specific modules
  webpack: (config) => {
    // Handle canvas-confetti properly
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    
    return config;
  },
};

export default nextConfig;

