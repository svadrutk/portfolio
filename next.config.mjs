// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Add a rule for mjs files to be treated as modules
      config.module.rules.push({
        test: /\.mjs$/,
        type: 'javascript/auto', // Ensure .mjs files are treated as modules
      });

      return config;
    },
  };

  export default nextConfig;
