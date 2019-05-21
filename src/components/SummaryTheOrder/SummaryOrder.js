import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "react-bootstrap/Button";
import { Divider } from "@material-ui/core";

const styles = theme => ({
	wrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		height: "100%"
	},
	header: {
		width: "100%"
	},
	pizzeriaWrapper: {
		maxWidth: 400,
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
			<div className={classes.wrapper}>
				<h1 className={classes.header}>Podsumowanie zamówienia</h1>
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
		);
	}
}

export default withStyles(styles)(SummaryOrder);
