import { TenantName } from '../../config/tenants'

/**
 * Get current tenant from environment variable
 * This is set during build time via UMI_ENV
 */
export function getCurrentTenant(): TenantName {
	// During build time, this will be replaced by the actual tenant
	// via webpack DefinePlugin or similar
	if (typeof window !== 'undefined' && (window as any).TENANT) {
		return (window as any).TENANT as TenantName
	}

	// Fallback to environment variable
	const tenant = process.env.UMI_ENV || 'clark'
	return tenant as TenantName
}

/**
 * Get tenant from URL parameter (optional for runtime switching)
 */
export function getTenantFromUrl(): TenantName | null {
	if (typeof window === 'undefined') return null

	const params = new URLSearchParams(window.location.search)
	const tenant = params.get('tenant')

	if (tenant === 'clark' || tenant === 'bruce') {
		return tenant
	}

	return null
}

