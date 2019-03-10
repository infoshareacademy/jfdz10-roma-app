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
import Alert from "react-bootstrap/Alert";

class CreatePizza extends Component {
	state = {
		isCreatePizza: false,
		isPizzaSubmitted: JSON.parse(window.localStorage.isPizzaSubmitted),
		ingredients:
			window.localStorage.getItem("ingredients") &&
			JSON.parse(window.localStorage.getItem("ingredients"))
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

	submitPizza = () => {
		window.localStorage.setItem(
			"ingredients",
			JSON.stringify(this.state.ingredients)
		);
		window.localStorage.setItem("isPizzaSubmitted", "true");
		this.setState({
			isPizzaSubmitted: JSON.parse(window.localStorage.isPizzaSubmitted),
			ingredients: JSON.parse(window.localStorage.getItem("ingredients"))
		});
	};

	cancelPizza = () => {
		const currentIngredients = JSON.parse(
			window.localStorage.getItem("ingredients")
		);
		window.localStorage.setItem("isPizzaSubmitted", "false");
		window.localStorage.setItem("ingredients", "[]");
		this.setState({
			isPizzaSubmitted: JSON.parse(window.localStorage.isPizzaSubmitted),
			isCreatePizza: true,
			ingredients: currentIngredients
		});
	};

	render() {
		const isPizzaSubmitted = JSON.parse(window.localStorage.isPizzaSubmitted);
		return (
			<Container className="h-100" style={{ position: "relative" }}>
				{isPizzaSubmitted && (
					<Alert
						variant="success"
						style={{
							margin: "1rem 0",
							position: "absolute",
							width: "100%",
							top: "0px",
							left: "0px"
						}}
					>
						<Alert.Heading>Potwierdziłeś wybrane składniki.</Alert.Heading>
						Przejdź do następnego kroku i złóż zamówienie.
					</Alert>
				)}
				<Row className="h-100">
					<Col
						lg={6}
						className="d-flex justify-content-center align-items-center"
					>
						{this.state.isCreatePizza || isPizzaSubmitted ? (
							<YourPizza
								ingredients={this.state.ingredients}
								removeIngredient={this.removeIngredient}
								clearIngredients={this.clearIngredients}
								submitPizza={this.submitPizza}
								isPizzaSubmitted={isPizzaSubmitted}
								cancelPizza={this.cancelPizza}
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
						{this.state.isCreatePizza || isPizzaSubmitted ? (
							<Ingredients
								chooseIngredient={this.chooseIngredient}
								isPizzaSubmitted={isPizzaSubmitted}
							/>
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
