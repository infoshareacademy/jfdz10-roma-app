import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ListScrollbar.css";
import "./containers.css";
import "./create-pizza-button.css";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { ListContainer, ListWrapper } from "./containers";

const YourPizza = ({ ingredients, removeIngredient, clearIngredients }) => {
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
			<div
				style={{
					display: "flex",
					justifyContent: "space-around",
					width: "100%",
					marginTop: "2rem"
				}}
			>
				<Button
					className="d-inline custom-button create-pizza-button"
					variant="link"
				>
					Zatwierdź pizzę
				</Button>
				<Button
					className="d-inline custom-button btn-secondary"
					onClick={() => clearIngredients()}
				>
					Wyczyść
				</Button>
			</div>
		</ListContainer>
	);
};

export default YourPizza;
