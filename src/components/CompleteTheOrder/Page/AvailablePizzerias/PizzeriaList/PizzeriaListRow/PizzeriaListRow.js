import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	pizzeriaWrapper: {
		display: "flex",
		padding: 15,
		marginBottom: 10
	},
	contactInfo: {
		width: "50%"
	}
});

const PizzeriaListRow = props => {
	const {
		classes,
		pizzeria,
		selectPizzeria,
		ingredients,
		isPizzeriaSelected,
		unselectPizzeria
	} = props;

	const price = availableIngredients => {
		const selected = [availableIngredients[0]];
		ingredients.forEach(ingredient => {
			const found = availableIngredients.find(
				element => element.name === ingredient.name
			);
			selected.push(found);
		});
		let price = selected.reduce((acc, next) => {
			return acc + next.price;
		}, 0);

		return price;
	};

	return (
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
			<div className={classes.contactInfo}>
				<p>
					Wartość zamówienia:{" "}
					<span>{price(pizzeria.availableIngredients)} zł</span>
				</p>
				{isPizzeriaSelected ? (
					<button onClick={unselectPizzeria}>Cofnij wybór</button>
				) : (
					<button onClick={() => selectPizzeria(pizzeria)}>
						Wybierz tą pizzerię
					</button>
				)}
			</div>
		</Paper>
	);
};

export default withStyles(styles)(PizzeriaListRow);
