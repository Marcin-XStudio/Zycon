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
				sans: ["var(--font-bulo)"]
			},
			colors: {
				"Green": "#71b8b5",
				"Blue": "#272c56",
				"Red": "#e65547",
				"Black": "#242b35",
				"Dark-grey": "#8A909A",
				"Light-grey": "#f8f9fa",
				"Medium-grey": "#D9D9D9",
				"Grey": "#C4CDD5",
				"Light-green": "#4DBAB5",
				"Disabled-bg-grey": "#EDEEF2",
				"Disabled-text-grey": "#9EA2B3",
				"Dark-blue": "#242C58"
			}
		}
	},
	plugins: [
		forms,
	]
};

export default config;
