/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				bg: '#060a16',
				surface: '#0d1526',
				'surface-2': '#131e36',
				border: '#1e2b48',
				fg: '#f4f6fb',
				muted: '#8b95ae',
				accent: {
					DEFAULT: '#4d7ef2',
					hover: '#6f97f7',
					soft: '#16223f',
				},
				violet: '#7c6cf0',
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'monospace'],
			},
			boxShadow: {
				card: '0 1px 0 rgba(255,255,255,0.03) inset, 0 14px 30px -18px rgba(2,6,20,0.75)',
				'card-hover': '0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 48px -20px rgba(2,6,20,0.85)',
				glow: '0 8px 30px -10px rgba(77,126,242,0.45)',
			},
			backgroundImage: {
				'hero-glow':
					'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(77,126,242,0.24), transparent 70%), radial-gradient(ellipse 40% 40% at 85% 15%, rgba(124,108,240,0.16), transparent 70%)',
			},
		},
	},
	plugins: [],
}
