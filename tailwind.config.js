import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss/types').Config} */
const config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)"]
			},
			colors: {
				primary: "#3498db",
				"primary-pressed": "#2980b9",
				secondary: "#e74c3c",
				"primary-text": "#1A202C"
			},
		}
	},
	plugins: [
		forms,
	]
};

export default config;
