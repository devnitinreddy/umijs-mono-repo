import React, { useMemo } from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { getTenantConfig } from '../../config/tenants'
import { getCurrentTenant } from '../utils/tenant'

interface BasicLayoutProps {
	children: React.ReactNode
}

function BasicLayout({ children }: BasicLayoutProps) {
	const tenantConfig = useMemo(() => {
		const tenant = getCurrentTenant()
		return getTenantConfig(tenant)
	}, [])

	return (
		<ThemeProvider theme={tenantConfig.muiTheme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}

export default BasicLayout
