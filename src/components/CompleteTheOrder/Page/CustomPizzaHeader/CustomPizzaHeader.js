import React, { Component } from "react";

class CustomPizzaHeader extends Component {
	state = {};
	render() {
		const { ingredients } = this.props;
		let allIngredients = "";

		return (
			<div
				className="list-group-item list-group-item-action flex-column align-items-start"
				style={{
					overflowWrap: "break-word",
					wordWrap: "break-word"
				}}
			>
				<div className="d-flex w-100 justify-content-between">
					<h5 className="mb-1">STWORZONA PIZZA</h5>
				</div>
				<p className="mb-1">
					{ingredients.forEach(ingredient => {
						if (allIngredients.length > 0) {
							allIngredients += ", ";
						}
						allIngredients += ingredient.name;
					})}
					{allIngredients}
				</p>
			</div>
		);
	}
}

export default CustomPizzaHeader;
