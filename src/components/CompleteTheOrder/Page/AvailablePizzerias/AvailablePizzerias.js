import React, { Component } from "react";
import { db } from "../../../../index";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { ListWrapper } from "../../../SharedComponents/containers";
import PizzeriaList from "./PizzeriaList/PizzeriaList";

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
	}

	selectPizzeria = pizzeria => {
		this.props.choosePizzeria(pizzeria);
	};

	render() {
		const {
			classes,
			isCustomPizza,
			isPizzeriaSelected,
			selectedPizzeria
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
					<PizzeriaList
						pizzerias={list}
						selectPizzeria={this.selectPizzeria}
						ingredients={ingredients}
						isPizzeriaSelected={isPizzeriaSelected}
						selectedPizzeria={selectedPizzeria}
					/>
				</ListWrapper>
			</div>
		);
	}
}

export default withStyles(styles)(AvailablePizzerias);
