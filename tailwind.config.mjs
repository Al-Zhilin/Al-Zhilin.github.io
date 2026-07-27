/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				bg: '#0c1018',
				'bg-2': '#111827',
				surface: '#141d2e',
				'surface-2': '#1b2540',
				border: 'rgba(255,255,255,0.07)',
				fg: '#f5f6f9',
				'ink-2': '#d4d9e2',
				'ink-3': '#a9b0bc',
				muted: '#7d8492',
				accent: {
					DEFAULT: '#f0923a',
					hover: '#f5a558',
					soft: 'rgba(240,146,58,0.12)',
				},
			},
			fontFamily: {
				display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
				sans: ['Manrope', 'system-ui', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
			},
			boxShadow: {
				card: '0 4px 24px rgba(0,0,0,0.45)',
				'card-hover': '0 10px 30px rgba(0,0,0,0.30)',
				glow: '0 8px 30px -10px rgba(240,146,58,0.45)',
			},
			backgroundImage: {
				'hero-glow':
					'radial-gradient(ellipse 70% 80% at 65% 45%, rgba(0,0,0,0.15), transparent 75%), radial-gradient(circle at 85% -10%, rgba(240,146,58,0.05), transparent 60%)',
			},
		},
	},
	plugins: [],
}
