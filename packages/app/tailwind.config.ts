import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand': '#F15025',
                'back': '#202020',
                'gray': {
                    '50': '#f1f1f1',
                    '100': '#e9e9e9',
                    '200': '#dddddd',
                    '300': '#cbcbcb',
                    '400': '#b0b0b0',
                    '500': '#696969',
                    '600': '#575757',
                    '700': '#4a4a4a',
                    '800': '#363636',
                    '900': '#242424',
                    '950': '#050505',
                },
                'primary': {
                    '50': '#fef4ee',
                    '100': '#fde5d7',
                    '200': '#fbc7ad',
                    '300': '#f8a179',
                    '400': '#f47043',
                    '500': '#f15025',
                    '600': '#e23214',
                    '700': '#bb2313',
                    '800': '#951e17',
                    '900': '#781c16',
                    '950': '#410a09',
                },

            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
