import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "react-bootstrap/Button";

const styles = theme => ({
	pizzeriaWrapper: {
		display: "flex",
		padding: 15,
		marginBottom: 10
	},
	contactInfo: {
		width: "50%"
	},
	favButton: {
		width: 170,
		height: 55,
		margin: "0 auto",
		padding: ".4rem .5rem",
		fontSize: "1.5rem",
		border: "none",
		color: "white",
		textDecoration: "none",
		backgroundColor: "#cc3333",
		"&:active": {
			color: "black",
			backgroundColor: "black"
		},
		"&:hover": {
			color: "white",
			textDecoration: "none",
			backgroundColor: "#a5182e"
		},
		"&:visited": {
			textDecoration: "none"
		},
		"&:focus": {
			textDecoration: "none",
			backgroundColor: "#a5182e",
			boxShadow: "none"
		}
	}
});

const PizzeriaListRow = props => {
	const {
		classes,
		pizzeria,
		selectPizzeria,
		ingredients,
		isPizzeriaSelected,
		unselectPizzeria,
		submitSelectedPizzeria
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
		const priceWithDecimal = Number.parseFloat(price).toFixed(2);
		return priceWithDecimal;
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
				<h5>
					Wartość zamówienia:{" "}
					<span style={{ fontWeight: "bold" }}>
						{price(pizzeria.availableIngredients)} zł
					</span>
				</h5>
				{isPizzeriaSelected ? (
					<div>
						<Button
							className={classes.favButton}
							style={{
								width: 140,
								height: 35,
								fontSize: 14,
								padding: "5px 7px",
								margin: 0
							}}
							variant="link"
							onClick={submitSelectedPizzeria}
						>
							{"Zamów tutaj"}
						</Button>
						<Button
							className="d-inline custom-button btn-secondary"
							style={{
								width: 140,
								height: 35,
								fontSize: 14,
								padding: "5px 7px",
								margin: 0,
								marginLeft: 10
							}}
							onClick={unselectPizzeria}
						>
							{"Cofnij wybór"}
						</Button>
					</div>
				) : (
					<Button
						className={classes.favButton}
						style={{
							width: 140,
							height: 35,
							fontSize: 14,
							padding: "5px 7px",
							margin: 0
						}}
						variant="link"
						onClick={() => selectPizzeria(pizzeria)}
					>
						{"Wybierz tą pizzerię"}
					</Button>
				)}
			</div>
		</Paper>
	);
};

export default withStyles(styles)(PizzeriaListRow);
