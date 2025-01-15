import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-space-mono-bold)'],
        grotesk: ['var(--font-space-grotesk-bold)'],
        groteskRegular: ['var(--font-space-grotesk-regular)'],
      },
      boxShadow: {
        'custom': `
          3px 3px rgb(0, 147, 187)
        `,
      },
    },
  },
  plugins: [],
};
export default config;
