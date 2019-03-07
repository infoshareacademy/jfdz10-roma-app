import React, { Component } from "react";
import "./ListScrollbar.css";
import "./containers.css";
import orders from "../../orders.json";
import pizzerias from "../../pizzerias.json";
import ingredients from "../../ingredients.json";
import { ListContainer, ListWrapper } from "./containers";

class PreviousOrders extends Component {
	render() {
		return (
			<ListContainer>
				<h3 className="list-header">Your previous orders</h3>
				<ListWrapper className="list-scrollbar">
					<div className="list-group">
						{orders.map(order => {
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
											{
												pizzerias.find(
													pizzeria => pizzeria.id === order.pizzeriaId
												).name
											}
										</h5>
									</div>
									<p className="mb-1">
										{order.ingredients.forEach(orderIngredient => {
											if (allIngredients.length > 0) {
												allIngredients += ", ";
											}
											allIngredients += ingredients.find(ingredient => {
												return ingredient.id === orderIngredient;
											}).name;
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
