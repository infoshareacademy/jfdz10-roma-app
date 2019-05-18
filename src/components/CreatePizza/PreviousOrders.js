import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import "../SharedComponents/ListScrollbar.css";
import "./containers.css";
import { ListWrapper } from "../SharedComponents/containers";

const styles = theme => ({
	container: {
		width: "440px",
		maxHeight: "500px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("sm")]: {
			height: "100%"
		}
	},
	header: {
		width: "100%",
		padding: "1rem 0"
	}
});

async function fetchOrders() {
	return await fetch("orders.json").then(res => res.json());
}

async function fetchIngredients() {
	return await fetch("ingredients.json").then(res => res.json());
}

async function fetchPizzerias() {
	return await fetch("pizzerias.json").then(res => res.json());
}

class PreviousOrders extends Component {
	state = {
		orders: [],
		ingredients: [],
		pizzerias: []
	};

	componentDidMount() {
		fetchOrders().then(orders => this.setState({ orders }));
		fetchPizzerias().then(pizzerias => this.setState({ pizzerias }));
		fetchIngredients().then(ingredients => this.setState({ ingredients }));
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.container}>
				<h3 className={classes.header}>Twoje poprzednie zamówienia</h3>
				<ListWrapper
					style={{
						paddingLeft: 0,
						paddingRight: 15,
						borderRadius: 0,
						height: "100%"
					}}
					className="list-scrollbar"
				>
					<div className="list-group">
						{this.state.orders.map(order => {
							let allIngredients = "";
							return (
								<div
									key={order.id}
									className="list-group-item list-group-item-action flex-column align-items-start"
									style={{
										overflowWrap: "break-word",
										wordWrap: "break-word"
									}}
								>
									<div className="d-flex w-100 justify-content-between">
										<h5 className="mb-1">
											{this.state.pizzerias.length !== 0
												? this.state.pizzerias.find(
														pizzeria => pizzeria.id === order.pizzeriaId
												  ).name
												: "None"}
										</h5>
									</div>
									<p className="mb-1">
										{order.ingredients.forEach(orderIngredient => {
											if (allIngredients.length > 0) {
												allIngredients += ", ";
											}
											allIngredients +=
												this.state.ingredients.length !== 0
													? this.state.ingredients.find(ingredient => {
															return ingredient.id === orderIngredient;
													  }).name
													: "None";
										})}
										{allIngredients}
									</p>
								</div>
							);
						})}
					</div>
				</ListWrapper>
			</div>
		);
	}
}

export default withStyles(styles)(PreviousOrders);
