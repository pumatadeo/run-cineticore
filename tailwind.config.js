/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'run-blue': '#001F3F',
                'run-gold': '#D4AF37',
                'run-white': '#FFFFFF',
                'run-silver': '#C0C0C0',
                'run-red': '#FF0000',
                'run-orange': '#FF8C00',
                'run-pink': '#FF1493',
            },
            fontFamily: {
                'sporty': ['Inter', 'system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
