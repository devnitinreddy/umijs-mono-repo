import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontWeight: 600,
	},
}))

interface ExampleButtonProps extends React.ComponentProps<typeof Button> {
	label: string
}

function ExampleButton({ label, ...props }: ExampleButtonProps) {
	const classes = useStyles()

	return (
		<Button
			className={classes.button}
			variant="contained"
			color="primary"
			{...props}
		>
			{label}
		</Button>
	)
}

export default ExampleButton

