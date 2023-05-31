/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'media',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'principal-0': '#0b2447',
                'principal-1': '#19376d',
                'principal-2': '#576cbc',
                'principal-3': '#a5d7e8',
                'blog-0': '#27374d',
                'blog-1': '#526d82',
                'blog-2': '#9db2bf',
                'blog-3': '#dde6ed',
            },
        },
    },
    plugins: [],
}
