import { useMemo } from 'react'
import { Banner } from '@share-component-lib/components'
import { Container, Typography, Grid, Card, CardContent, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BusinessIcon from '@material-ui/icons/Business'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import SecurityIcon from '@material-ui/icons/Security'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects'
import GroupIcon from '@material-ui/icons/Group'
import StarIcon from '@material-ui/icons/Star'
import { getTenantConfig } from '../../config/tenants'
import { getCurrentTenant } from '../utils/tenant'

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100vh',
		backgroundColor: theme.palette.background.default,
	},
	section: {
		padding: theme.spacing(8, 0),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		transition: 'transform 0.3s, box-shadow 0.3s',
		'&:hover': {
			transform: 'translateY(-8px)',
			boxShadow: theme.shadows[12],
		},
	},
	icon: {
		fontSize: 60,
		marginBottom: theme.spacing(2),
		color: theme.palette.primary.main,
	},
	cta: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		padding: theme.spacing(6, 0),
		marginTop: theme.spacing(4),
	},
}))

// Content configuration per tenant
const tenantContent = {
	clark: {
		servicesTitle: 'Our Services',
		servicesSubtitle: 'Leading the way in technology and innovation',
		services: [
			{
				icon: BusinessIcon,
				title: 'Enterprise Solutions',
				description: 'Comprehensive business solutions tailored to your needs. We help enterprises scale and succeed.',
			},
			{
				icon: TrendingUpIcon,
				title: 'Growth Strategy',
				description: 'Data-driven strategies to accelerate your business growth and market presence.',
			},
			{
				icon: SecurityIcon,
				title: 'Security First',
				description: 'Enterprise-grade security solutions to protect your valuable business assets.',
			},
		],
		ctaTitle: 'Ready to Transform Your Business?',
		ctaSubtitle: 'Join hundreds of companies that trust Clark Industries',
		ctaButton: 'Get Started',
	},
	bruce: {
		servicesTitle: 'What We Offer',
		servicesSubtitle: 'Excellence in every aspect of our service',
		services: [
			{
				icon: EmojiObjectsIcon,
				title: 'Innovation',
				description: 'Cutting-edge solutions that push boundaries and create new possibilities for your business.',
			},
			{
				icon: GroupIcon,
				title: 'Expert Team',
				description: 'Our team of industry experts brings decades of combined experience to every project.',
			},
			{
				icon: StarIcon,
				title: 'Quality Assured',
				description: 'We deliver nothing but the highest quality products and services to our clients.',
			},
		],
		ctaTitle: 'Partner With Excellence',
		ctaSubtitle: 'Discover why leading companies choose Bruce Enterprises',
		ctaButton: 'Contact Us',
	},
}

function HomePage() {
	const classes = useStyles()
	
	const { config, content } = useMemo(() => {
		const tenant = getCurrentTenant()
		return {
			config: getTenantConfig(tenant),
			content: tenantContent[tenant],
		}
	}, [])

	return (
		<div className={classes.root}>
			<Banner 
				title={config.name} 
				subtitle={config.subtitle} 
				theme={config.bannerTheme} 
			/>

			<Container maxWidth="lg" className={classes.section}>
				<Box textAlign="center" mb={6}>
					<Typography variant="h3" component="h2" gutterBottom>
						{content.servicesTitle}
					</Typography>
					<Typography variant="body1" color="textSecondary">
						{content.servicesSubtitle}
					</Typography>
				</Box>

				<Grid container spacing={4}>
					{content.services.map((service, index) => {
						const IconComponent = service.icon
						return (
							<Grid item xs={12} md={4} key={index}>
								<Card className={classes.card}>
									<CardContent>
										<Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
											<IconComponent className={classes.icon} />
											<Typography variant="h5" component="h3" gutterBottom>
												{service.title}
											</Typography>
											<Typography variant="body2" color="textSecondary">
												{service.description}
											</Typography>
										</Box>
									</CardContent>
								</Card>
							</Grid>
						)
					})}
				</Grid>
			</Container>

			<Box className={classes.cta}>
				<Container maxWidth="md">
					<Box textAlign="center">
						<Typography variant="h4" component="h2" gutterBottom>
							{content.ctaTitle}
						</Typography>
						<Typography variant="body1" paragraph>
							{content.ctaSubtitle}
						</Typography>
						<Button variant="contained" color="secondary" size="large">
							{content.ctaButton}
						</Button>
					</Box>
				</Container>
			</Box>
		</div>
	)
}

export default HomePage
