import React from "react";
import "./ListScrollbar.css";
import "./containers.css";
import ListGroup from "react-bootstrap/ListGroup";
import { ListContainer, ListWrapper } from "./containers";
import ingredients from "../../ingredients.json";

const Ingredients = ({ chooseIngredient, isPizzaSubmitted }) => {
	const handleClickIngredient = ingredientId => {
		const ingredient = ingredients.find(el => el.id === ingredientId);
		chooseIngredient({ ...ingredient, id: Date.now() });
	};

	return (
		<ListContainer>
			<h3 className="list-header">Wybierz składniki</h3>
			<ListWrapper className="list-scrollbar">
				<ListGroup>
					{ingredients.map(element => (
						<ListGroup.Item
							action
							key={element.id}
							onClick={
								!isPizzaSubmitted
									? () => handleClickIngredient(element.id)
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
};

export default Ingredients;
