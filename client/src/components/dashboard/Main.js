import React from "react";
import { MainAction } from "./MainAction";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import CardItem from "../material-ui/CardItem";
import { cardsInfo } from "../material-ui/MainInfo";
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	center: {
		margin: "auto"
	}
}));
const Main = () => {
	const classes = useStyles();
	return (
		<div className='main'>
			<MainAction />
			<Container maxWidth='lg'>
				<div className={classes.root}>
					<Grid
						container
						spacing={3}
						mx='auto'
						justify='center'
						alignItems='center'>
						{cardsInfo.map(info => (
							<Grid key={info.id} item xs={12} sm={6} lg={4} justify='center'>
								<CardItem info={info} />
							</Grid>
						))}
					</Grid>
				</div>
			</Container>
		</div>
	);
};

export default Main;
