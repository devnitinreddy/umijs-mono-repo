import { createMuiTheme } from '@material-ui/core'
import { BannerTheme } from '@share-component-lib/components'

export interface TenantConfig {
	name: string
	subtitle: string
	muiTheme: ReturnType<typeof createMuiTheme>
	bannerTheme: BannerTheme
}

// Clark's Material-UI theme
const clarkMuiTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#0066cc',
			light: '#3385db',
			dark: '#004c99',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#ffcc00',
			light: '#ffdd33',
			dark: '#cc9900',
			contrastText: '#000000',
		},
		background: {
			default: '#f5f5f5',
			paper: '#ffffff',
		},
	},
	typography: {
		fontFamily: [
			'Roboto',
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Arial',
			'sans-serif',
		].join(','),
		h1: {
			fontWeight: 700,
		},
	},
})

// Clark's Banner theme
const clarkBannerTheme: BannerTheme = {
	backgroundColor: '#0066cc',
	textColor: '#ffffff',
	accentColor: '#ffcc00',
	fontSize: '3rem',
	fontWeight: 700,
	padding: '4rem',
}

export const clarkConfig: TenantConfig = {
	name: 'Clark Industries',
	subtitle: 'Innovation at its finest',
	muiTheme: clarkMuiTheme,
	bannerTheme: clarkBannerTheme,
}

export default clarkConfig

