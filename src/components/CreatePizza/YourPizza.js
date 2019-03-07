import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ListScrollbar.css";
import "./containers.css";
import ListGroup from "react-bootstrap/ListGroup";
import { ListContainer, ListWrapper } from "./containers";

const YourPizza = ({ ingredients, removeIngredient }) => {
	return (
		<ListContainer>
			<h3 className="list-header"> Your ingredients:</h3>
			<ListWrapper className="list-scrollbar">
				<ListGroup>
					{ingredients.map((element, id) => (
						<ListGroup.Item action key={id}>
							<h5
								className="mb-1"
								style={{ color: "#495057", textTransform: "capitalize" }}
							>
								{element.name}
								<span
									className="close"
									onClick={() => removeIngredient(element.id)}
								>
									&times;
								</span>
							</h5>
						</ListGroup.Item>
					))}
				</ListGroup>
			</ListWrapper>
		</ListContainer>
	);
};

export default YourPizza;
