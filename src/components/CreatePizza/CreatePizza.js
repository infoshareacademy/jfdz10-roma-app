import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./create-pizza-button.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Ingredients from "./Ingredients";
import YourPizza from "./YourPizza";
import PreviousOrders from "./PreviousOrders";

class CreatePizza extends Component {
	state = {
		isCreatePizza: false,
		ingredients: []
	};

	handleChangeCreatePizza = () => {
		this.setState({
			isCreatePizza: true
		});
	};

	chooseIngredient = ingredient => {
		this.setState({ ingredients: [...this.state.ingredients, ingredient] });
	};

	removeIngredient = ingredientId => {
		this.setState({
			ingredients: this.state.ingredients.filter(el => el.id !== ingredientId)
		});
	};

	clearIngredients = () => {
		this.setState({
			ingredients: []
		});
	};

	render() {
		return (
			<Container className="h-100">
				<Row className="h-100">
					<Col
						lg={6}
						className="d-flex justify-content-center align-items-center"
					>
						{this.state.isCreatePizza ? (
							<YourPizza
								ingredients={this.state.ingredients}
								removeIngredient={this.removeIngredient}
								clearIngredients={this.clearIngredients}
							/>
						) : (
							<Button
								size="lg"
								className="custom-button create-pizza-button"
								onClick={this.handleChangeCreatePizza}
								variant="link"
							>
								Stwórz pizzę
							</Button>
						)}
					</Col>
					<Col className="d-flex justify-content-center align-items-center">
						{this.state.isCreatePizza ? (
							<Ingredients chooseIngredient={this.chooseIngredient} />
						) : (
							<PreviousOrders />
						)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default CreatePizza;
