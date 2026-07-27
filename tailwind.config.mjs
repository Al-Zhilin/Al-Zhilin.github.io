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
					DEFAULT: '#2f5fd6',
					hover: '#4573e0',
					soft: 'rgba(47,95,214,0.14)',
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
				glow: '0 8px 30px -10px rgba(47,95,214,0.45)',
			},
			backgroundImage: {
				'hero-glow':
					'radial-gradient(ellipse 70% 80% at 65% 45%, rgba(0,0,0,0.15), transparent 75%), radial-gradient(circle at 85% -10%, rgba(47,95,214,0.08), transparent 60%)',
			},
		},
	},
	plugins: [],
}
