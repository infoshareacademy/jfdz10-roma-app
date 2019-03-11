import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./ListScrollbar.css";
import "./containers.css";
import "./create-pizza-button.css";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { ListContainer, ListWrapper } from "./containers";

const getFromLocalStorage = item => {
	return JSON.parse(window.localStorage.getItem(item));
};

const YourIngredients = ({
	ingredients,
	removeIngredient,
	clearIngredients,
	submitPizza,
	isPizzaSubmitted,
	cancelIngredients
}) => {
	const chosenIngredients =
		getFromLocalStorage("ingredients") !== null &&
		getFromLocalStorage("ingredients").length > 0
			? getFromLocalStorage("ingredients")
			: ingredients;
	return (
		<ListContainer>
			<h3 className="list-header">Twoje wybrane składniki: </h3>
			<ListWrapper className="list-scrollbar">
				<ListGroup>
					{chosenIngredients.map((element, id) => (
						<ListGroup.Item action key={id}>
							<h5
								className="mb-1"
								style={{ color: "#495057", textTransform: "capitalize" }}
							>
								{element.name}
								<span
									className="close"
									onClick={
										isPizzaSubmitted ? null : () => removeIngredient(element.id)
									}
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
					onClick={
						!isPizzaSubmitted && ingredients.length !== 0
							? () => submitPizza()
							: null
					}
					disabled={isPizzaSubmitted ? true : false}
				>
					Zatwierdź pizzę
				</Button>
				<Button
					className="d-inline custom-button btn-secondary"
					onClick={
						isPizzaSubmitted
							? () => cancelIngredients()
							: () => clearIngredients()
					}
				>
					{isPizzaSubmitted ? "Anuluj" : "Wyczyść"}
				</Button>
			</div>
		</ListContainer>
	);
};

export default YourIngredients;
