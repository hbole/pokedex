module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./layout/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false,
	theme: {
		extend: {},
	},
	variants: {
		transform: ["hover", "focus"],
	},
	plugins: [require("tailwindcss"), require("precss"), require("autoprefixer")],
};
