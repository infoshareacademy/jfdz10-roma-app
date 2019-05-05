import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import { db } from "../../../../index";
import { withStyles } from "@material-ui/core/styles";

import { ListWrapper } from "../../../SharedComponents/containers";

const styles = theme => ({
	wrapper: {
		width: "100%"
	},
	list: {
		padding: "0 20px 20px 20px"
	},
	pizzeriaWrapper: {
		display: "flex",
		padding: 15,
		marginBottom: 10
	},
	contactInfo: {
		width: "50%"
	}
});

const getFromLocalStorage = item => {
	return JSON.parse(window.localStorage.getItem(item));
};

class AvailablePizzerias extends Component {
	state = {
		ingredients: [],
		pizzerias: []
	};

	componentDidMount() {
		this.setState({
			ingredients: getFromLocalStorage("ingredients")
		});
		db.ref("pizzerias")
			.once("value")
			.then(snapshot => {
				const pizzerias = snapshot.val();
				this.setState({
					...this.state,
					pizzerias
				});
			});
	}

	render() {
		const { classes } = this.props;
		const { pizzerias = [], ingredients = [] } = this.state;

		const list = pizzerias.filter(pizzeria => {
			return ingredients.every(ingredient => {
				return pizzeria.availableIngredients.some(
					element => element.name === ingredient.name
				);
			});
		});

		return (
			<div className={classes.wrapper}>
				<h3 style={{ paddingLeft: 20 }}>Dostępne pizzerie:</h3>
				<ListWrapper className={classes.list}>
					{list.length === 0 ? (
						<h4 style={{ textAlign: "center" }}>
							Nie znaleziono żadnej pizzeri, która mogłaby zrobić taką pizzę...
						</h4>
					) : (
						list.map(pizzeria => (
							<Paper className={classes.pizzeriaWrapper}>
								<div className={classes.contactInfo}>
									<h4>{pizzeria.name}</h4>
									<p>
										ul. {pizzeria.contactInfo.address.street},{" "}
										{pizzeria.contactInfo.address.city},{" "}
										{pizzeria.contactInfo.address.postcode}
									</p>
									<p>Tel. {pizzeria.contactInfo.phone}</p>
								</div>
							</Paper>
						))
					)}
				</ListWrapper>
			</div>
		);
	}
}

export default withStyles(styles)(AvailablePizzerias);
