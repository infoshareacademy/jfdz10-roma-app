import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
	wrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		marginTop: 15
	},
	header: {
		width: "100%"
	},
	ingredientsWrapper: {
		maxWidth: 250,
		width: "100%"
	},
	pizzeriaWrapper: {
		maxWidth: 250,
		width: "100%"
	},
	pizzeria: {
		padding: 15,
		textAlign: "center"
	}
});

const getFromLocalStorage = item => {
	return JSON.parse(window.localStorage.getItem(item));
};

class SummaryOrder extends Component {
	state = {
		pizzeria: getFromLocalStorage("selectedPizzeria"),
		ingredients: getFromLocalStorage("ingredients")
	};

	render() {
		const { pizzeria, ingredients } = this.state;
		const { classes } = this.props;
		console.log(this.state);
		return (
			<Fragment>
				<h1 className={classes.header}>Podsumowanie zamówienia</h1>
				<div className={classes.wrapper}>
					<div className={classes.ingredientsWrapper}>
						<h2>Wybrane składniki: </h2>
						<div className={classes.ingredients}>
							<ul>
								{ingredients.map(el => {
									return <li style={{ fontSize: 16 }}>{el.name}</li>;
								})}
							</ul>
						</div>
					</div>
					<div className={classes.pizzeriaWrapper}>
						<h2>Wybrana pizzeria: </h2>
						<Paper className={classes.pizzeria}>
							<h2>{pizzeria.name}</h2>
							<p>{pizzeria.contactInfo.address.street}</p>
							<p>
								{pizzeria.contactInfo.address.postcode}{" "}
								{pizzeria.contactInfo.address.city}
							</p>
							<p>{pizzeria.contactInfo.phone}</p>
							<p>{pizzeria.contactInfo.website}</p>
						</Paper>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(styles)(SummaryOrder);
