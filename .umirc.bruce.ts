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
	title: 'Bruce Enterprises',
	publicPath: process.env.NODE_ENV === 'production' ? '/bruce/' : '/',
	base: process.env.NODE_ENV === 'production' ? '/bruce/' : '/',
	outputPath: 'dist/bruce',
	theme: {
		'primary-color': '#2c3e50',
	},
	headScripts: [
		{ content: `window.TENANT = 'bruce';` },
	],
	define: {
		'process.env.TENANT': 'bruce',
	},
})

