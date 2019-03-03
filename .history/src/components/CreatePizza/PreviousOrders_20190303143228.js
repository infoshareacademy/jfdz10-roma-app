import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./PreviousOrders.css";
import styled from "styled-components";
import orders from "./orders.json";
import pizzerias from "./pizzerias.json";
import ingredients from "./ingredients.json";

const Wrapper = styled.div`
	width: 400px;
	height: 80%;
	padding: 0 2rem;
	border-radius: 10px;
	overflow-y: auto;
	overflow-x: hidden;
`;

class PreviousOrders extends Component {
	render() {
		return (
			<Wrapper className="previous-orders">
				<h3>Your previous orders</h3>
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
			</Wrapper>
		);
	}
}

export default PreviousOrders;
