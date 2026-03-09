/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}"  // Tailwind scans all your React files
    ],
    theme: {
        extend: {},                   // Add custom colors, fonts, etc. here
    },
    plugins: [],                    // Add Tailwind plugins if needed
};

module.exports = config;
