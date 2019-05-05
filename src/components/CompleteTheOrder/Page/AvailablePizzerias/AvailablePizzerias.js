import React, { Component } from "react";
import { db } from "../../../../index";
import { withStyles } from "@material-ui/core/styles";

import { ListWrapper } from "../../../SharedComponents/containers";
import PizzeriaListRow from "./PizzeriaListRow/PizzeriaListRow";

const styles = theme => ({
	wrapper: {
		width: "100%"
	},
	list: {
		padding: "0 20px 0px 20px"
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
		console.log("hello");
	}

	selectPizzeria = pizzeria => {
		this.props.choosePizzeria(pizzeria);
	};

	render() {
		const {
			classes,
			isCustomPizza,
			choosePizzeria,
			isPizzeriaSelected
		} = this.props;
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
							<PizzeriaListRow
								key={pizzeria.id}
								pizzeria={pizzeria}
								selectPizzeria={this.selectPizzeria}
								ingredients={ingredients}
							/>
						))
					)}
				</ListWrapper>
			</div>
		);
	}
}

export default withStyles(styles)(AvailablePizzerias);
