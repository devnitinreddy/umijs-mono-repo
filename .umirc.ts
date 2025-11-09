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
	title: 'UmiJS Multi-Tenant Mono Repo',
	// Configure theme for Material-UI (default: Clark)
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

