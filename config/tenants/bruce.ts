import { createMuiTheme } from '@material-ui/core'
import { BannerTheme } from '@share-component-lib/components'

export interface TenantConfig {
	name: string
	subtitle: string
	muiTheme: ReturnType<typeof createMuiTheme>
	bannerTheme: BannerTheme
}

// Bruce's Material-UI theme
const bruceMuiTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#2c3e50',
			light: '#34495e',
			dark: '#1a252f',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#e74c3c',
			light: '#ec6f63',
			dark: '#c0392b',
			contrastText: '#ffffff',
		},
		background: {
			default: '#ecf0f1',
			paper: '#ffffff',
		},
	},
	typography: {
		fontFamily: [
			'Helvetica Neue',
			'Helvetica',
			'Arial',
			'sans-serif',
		].join(','),
		h1: {
			fontWeight: 600,
		},
	},
})

// Bruce's Banner theme
const bruceBannerTheme: BannerTheme = {
	backgroundColor: '#2c3e50',
	textColor: '#ffffff',
	accentColor: '#e74c3c',
	fontSize: '2.8rem',
	fontWeight: 600,
	padding: '3.5rem',
}

export const bruceConfig: TenantConfig = {
	name: 'Bruce Enterprises',
	subtitle: 'Excellence delivered',
	muiTheme: bruceMuiTheme,
	bannerTheme: bruceBannerTheme,
}

export default bruceConfig

