// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      config.resolve.alias.canvas = false;
      // Add a rule for mjs files to be treated as modules
      config.module.rules.push({
        test: /\.mjs$/,
        type: 'javascript/auto', // Ensure .mjs files are treated as modules
      });
      if (!isServer) {
        config.resolve.alias = {
          'core-js-pure': 'core-js/features',
        };
      }


      return config;
    },

  };

  export default nextConfig;
