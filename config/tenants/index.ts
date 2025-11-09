import { TenantConfig } from './clark'
import clarkConfig from './clark'
import bruceConfig from './bruce'

export type TenantName = 'clark' | 'bruce'

export const tenants: Record<TenantName, TenantConfig> = {
	clark: clarkConfig,
	bruce: bruceConfig,
}

export function getTenantConfig(tenantName: TenantName): TenantConfig {
	return tenants[tenantName]
}

export { clarkConfig, bruceConfig }
export type { TenantConfig }

