import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import image from "../img/kevin-bhagat-zNRITe8NPqY-unsplash.jpg";
import clsx from "clsx";
import {
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Collapse,
	Avatar,
	IconButton,
	Typography
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 345
	},
	media: {
		height: 0,
		paddingTop: "56.25%"
	},
	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: "rotate(180deg)"
	},
	avatar: {
		backgroundColor: red[500]
	}
}));
const FancyCard = () => {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const handleExpand = () => setExpanded(!expanded);
	return (
		<Card className={classes.card}>
			<CardHeader
				avatar={<Avatar className={classes.avatar}>M</Avatar>}
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				title='the enigma label'
				subheader='september 14, 2019'
			/>
			<CardMedia className={classes.media} title='article' image={image} />
			<CardContent>
				<Typography variant='body2' color='textSecondary' component='p'>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Necessitatibus debitis enim saepe perferendis vitae tempora non soluta
					impedit odio. Obcaecati!
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton>
					<FavoriteIcon />
				</IconButton>
				<IconButton>
					<ShareIcon />
				</IconButton>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded
					})}
					onClick={handleExpand}
					aria-expanded={expanded}>
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<Typography paragraph>main: </Typography>
					<Typography paragraph>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex
						reprehenderit nisi expedita minus illum quidem natus minima libero,
						eaque magnam. Quia voluptate, molestias esse exercitationem iusto
						odit suscipit, provident obcaecati perferendis nesciunt nostrum. Rem
						aut sunt soluta, id, amet illo architecto libero impedit error non
						perferendis, sequi delectus praesentium alias.
					</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default FancyCard;
