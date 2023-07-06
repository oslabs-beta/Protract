/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/client/*.{js,ts,jsx,tsx}',
    './src/client/components/*.{js,ts,jsx,tsx}',
    './src/client/components/Containers/*.{js,ts,jsx,tsx}',
    './src/client/components/Modals/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};
