import { defineConfig } from 'umi'

export default defineConfig({
	nodeModulesTransform: {
		type: 'none',
	},
	routes: [
		{
			path: '/',
			component: '@/layouts/index',
			routes: [
				{ path: '/', component: '@/pages/index' },
			],
		},
	],
	fastRefresh: {},
	webpack5: {},
	dynamicImport: {},
	title: 'Clark Industries',
	publicPath: process.env.NODE_ENV === 'production' ? '/clark/' : '/',
	base: process.env.NODE_ENV === 'production' ? '/clark/' : '/',
	outputPath: 'dist/clark',
	theme: {
		'primary-color': '#0066cc',
	},
	headScripts: [
		{ content: `window.TENANT = 'clark';` },
	],
	define: {
		'process.env.TENANT': 'clark',
	},
})

