import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import IngredientsList from "./IngredientsList";
import YourIngredients from "./YourIngredients";
import PreviousOrders from "./PreviousOrders";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
	favButton: {
		width: 170,
		height: 55,
		margin: "0 auto",
		padding: ".4rem .5rem",
		fontSize: "1.5rem",
		border: "none",
		color: "white",
		textDecoration: "none",
		backgroundColor: "#cc3333",
		"&:active": {
			color: "black",
			backgroundColor: "black"
		},
		"&:hover": {
			color: "white",
			textDecoration: "none",
			backgroundColor: "#a5182e"
		},
		"&:visited": {
			textDecoration: "none"
		},
		"&:focus": {
			textDecoration: "none",
			backgroundColor: "#a5182e",
			boxShadow: "none"
		}
	}
});

const getFromLocalStorage = item => {
	return JSON.parse(window.localStorage.getItem(item));
};

class CreatePizza extends Component {
	state = {
		isCreatePizza: false,
		isPizzaSubmitted: window.localStorage.isPizzaSubmitted
			? JSON.parse(window.localStorage.isPizzaSubmitted)
			: false,
		ingredients: window.localStorage.getItem("ingredients")
			? getFromLocalStorage("ingredients")
			: []
	};

	handleChangeCreatePizza = () => {
		this.setState({
			isCreatePizza: true
		});
	};

	chooseIngredient = ingredient => {
		const ingredients = this.state.ingredients.find(
			element => element.name === ingredient.name
		);
		if (ingredients) {
			return;
		}
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

	submitIngredients = () => {
		window.localStorage.setItem(
			"ingredients",
			JSON.stringify(this.state.ingredients)
		);
		window.localStorage.setItem("isPizzaSubmitted", "true");
		this.setState({
			isPizzaSubmitted: true
		});
		this.props.submitPizza();
		this.props.history.push("/make-order");
	};

	cancelIngredients = () => {
		const selectedIngredients = getFromLocalStorage("ingredients");
		this.setState({
			isPizzaSubmitted: false,
			isCreatePizza: true,
			ingredients: selectedIngredients
		});
		window.localStorage.clear();
		this.props.submitPizza();
	};

	render() {
		const isPizzaSubmitted = this.state.isPizzaSubmitted;
		const { classes } = this.props;
		return (
			<Fragment>
				{isPizzaSubmitted && (
					<Fragment>
						<div
							variant="success"
							style={{
								position: "fixed",
								width: "100%",
								height: "100vh",
								backgroundColor: "rgba(209,241,218,0.6)",
								zIndex: 1000
							}}
						>
							<Paper
								style={{
									position: "absolute",
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									textAlign: "center",
									padding: "25px 50px"
								}}
							>
								<h1>Potwierdziłeś wybrane składniki.</h1>
								<h2>Przejdź do następnego kroku i złóż zamówienie.</h2>
								<Button
									className="d-inline custom-button btn-secondary"
									onClick={this.cancelIngredients}
								>
									{"Anuluj"}
								</Button>
							</Paper>
						</div>
					</Fragment>
				)}
				<Container className="h-100" style={{ position: "relative" }}>
					<Row className="h-100">
						<Col
							lg={6}
							className="d-flex justify-content-center align-items-center"
						>
							{this.state.isCreatePizza || isPizzaSubmitted ? (
								<YourIngredients
									ingredients={this.state.ingredients}
									removeIngredient={this.removeIngredient}
									clearIngredients={this.clearIngredients}
									submitIngredients={this.submitIngredients}
									isPizzaSubmitted={isPizzaSubmitted}
									cancelIngredients={this.cancelIngredients}
								/>
							) : (
								<Button
									size="lg"
									// className="custom-button create-pizza-button"
									className={classes.favButton}
									onClick={this.handleChangeCreatePizza}
									variant="link"
								>
									Stwórz pizzę
								</Button>
							)}
						</Col>
						<Col className="d-flex justify-content-center align-items-center">
							{this.state.isCreatePizza || isPizzaSubmitted ? (
								<IngredientsList
									chooseIngredient={this.chooseIngredient}
									isPizzaSubmitted={isPizzaSubmitted}
								/>
							) : (
								<PreviousOrders />
							)}
						</Col>
					</Row>
				</Container>
			</Fragment>
		);
	}
}

export default withStyles(styles)(CreatePizza);
