/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				bg: '#0a0a0a',
				surface: '#121212',
				border: '#262626',
				fg: '#f2f2f0',
				muted: '#9a9a96',
				accent: {
					DEFAULT: '#4d7ea8',
					hover: '#5f92bd',
				},
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'monospace'],
			},
		},
	},
	plugins: [],
}
