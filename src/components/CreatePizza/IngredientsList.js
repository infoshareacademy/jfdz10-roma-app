import React, { Component } from "react";
import "../SharedComponents/ListScrollbar.css";
import "./containers.css";
import ListGroup from "react-bootstrap/ListGroup";
import { ListContainer, ListWrapper } from "../SharedComponents/containers";

async function fetchIngredients() {
	return await fetch("ingredients.json").then(res => res.json());
}
class IngredientsList extends Component {
	state = {
		ingredients: []
	};

	handleClickIngredient = ingredientId => {
		const ingredient = this.state.ingredients.find(
			el => el.id === ingredientId
		);
		this.props.chooseIngredient({ ...ingredient, id: Date.now() });
	};

	componentDidMount() {
		fetchIngredients().then(ingredients => this.setState({ ingredients }));
	}

	render() {
		return (
			<ListContainer>
				<h3 className="list-header">Wybierz składniki</h3>
				<ListWrapper className="list-scrollbar">
					<ListGroup>
						{this.state.ingredients.map(element => (
							<ListGroup.Item
								action
								key={element.id}
								onClick={
									!this.props.isPizzaSubmitted
										? () => this.handleClickIngredient(element.id)
										: null
								}
							>
								<h5
									className="mb-1"
									style={{ color: "#495057", textTransform: "capitalize" }}
								>
									{element.name}
								</h5>
							</ListGroup.Item>
						))}
					</ListGroup>
				</ListWrapper>
			</ListContainer>
		);
	}
}

export default IngredientsList;
