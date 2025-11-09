declare module '*.css'
declare module '*.less'
declare module '*.png'
declare module '*.svg' {
	export function ReactComponent(
		props: React.SVGProps<SVGSVGElement>,
	): React.ReactElement
	const url: string
	export default url
}

// Material-UI type declarations
declare module '@material-ui/core'
declare module '@material-ui/icons'
declare module '@material-ui/lab'

