import React, { Component } from "react";
import "../SharedComponents/ListScrollbar.css";
import "./containers.css";
import { ListContainer, ListWrapper } from "../SharedComponents/containers";

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
		return (
			<ListContainer>
				<h3 className="list-header">Twoje poprzednie zamówienia</h3>
				<ListWrapper className="list-scrollbar">
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
			</ListContainer>
		);
	}
}

export default PreviousOrders;
