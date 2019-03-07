import React from "react";
import "./ListScrollbar.css";
import "./containers.css";
import ListGroup from "react-bootstrap/ListGroup";
import { ListContainer, ListWrapper } from "./containers";
import ingredients from "../../ingredients.json";

const Ingredients = props => {
	const handleClickIngredient = ingredientId => {
		const ingredient = ingredients.find(el => el.id === ingredientId);
		props.chooseIngredient(ingredient);
	};

	return (
		<ListContainer>
			<h3 className="list-header"> Choose ingredients:</h3>
			<ListWrapper className="list-scrollbar">
				<ListGroup>
					{ingredients.map(element => (
						<ListGroup.Item
							action
							key={element.id}
							onClick={() => handleClickIngredient(element.id)}
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
