/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Isto ignora erros de linting durante o build
      ignoreDuringBuilds: true,
    },
    typescript: {
      // Isto ignora erros de TypeScript durante o build
      ignoreBuildErrors: true,
    },
  };
  
  module.exports = nextConfig;