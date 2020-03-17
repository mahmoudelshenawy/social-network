import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { spacing } from "@material-ui/system";
import {
	Card,
	CardActionArea,
	CardContent,
	CardActions,
	CardMedia,
	Button,
	Typography
} from "@material-ui/core";
const useStyles = makeStyles({
	card: {
		maxWidth: 345
	},
	media: {
		height: 150,
		objectFit: "cover"
	},
	btn: {
		background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
		border: 0,
		borderRadius: 3,
		boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
		color: "white",
		// height: 48,
		padding: "16px 30px",
		margin: "0 auto",
		textAlign: "center",
		"&:hover": {
			textDecoration: "none",
			color: "white"
		}
	}
});
const CardItem = ({ info: { title, image, description, path } }) => {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={image}
					title='i don not know'
				/>
				<CardContent>
					<Typography gutterBottom variant='h5' component='h2'>
						{title}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Link to={path} className={classes.btn} color='primary'>
					{title}
				</Link>
			</CardActions>
		</Card>
	);
};

export default CardItem;
