/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/client/*.{js,ts,jsx,tsx}',
    './src/client/components/*.{js,ts,jsx,tsx}',
    './src/client/components/containers/*.{js,ts,jsx,tsx}',
    './src/client/components/modals/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};
