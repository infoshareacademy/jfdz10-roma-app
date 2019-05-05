import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { withStyles } from "@material-ui/core/styles";

import CustomPizzaHeader from "./CustomPizzaHeader/CustomPizzaHeader";
import AvailablePizzerias from "./AvailablePizzerias/AvailablePizzerias";

const styles = theme => ({
	container: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		padding: 20
	},
	title: {
		width: "100%"
	}
});

const getFromLocalStorage = item => {
	return JSON.parse(window.localStorage.getItem(item));
};

class CompleteOrderPage extends Component {
	state = {
		ingredients: [],
		isPizzeriaSelected: false,
		selectedPizzeria: {}
	};

	componentDidMount() {
		this.setState({
			...this.state,
			isPizzeriaSelected: !!getFromLocalStorage("selectedPizzeria"),
			selectedPizzeria: getFromLocalStorage("selectedPizzeria"),
			ingredients: getFromLocalStorage("ingredients")
		});
	}

	cancelIngredients = () => {
		window.localStorage.clear();
		this.props.submitPizza();
		this.props.history.push("/create-pizza");
	};

	handleChoosePizzeria = pizzeria => {
		this.setState({
			...this.state,
			isPizzeriaSelected: true,
			selectedPizzeria: pizzeria
		});
		window.localStorage.setItem("selectedPizzeria", JSON.stringify(pizzeria));
	};

	handleUnselectPizzeria = () => {
		this.setState({
			...this.state,
			isPizzeriaSelected: false,
			selectedPizzeria: {}
		});
		window.localStorage.removeItem("selectedPizzeria");
	};

	render() {
		const { classes, isCustomPizzaSubmitted } = this.props;
		const { ingredients, selectedPizzeria, isPizzeriaSelected } = this.state;

		return (
			<Container className="h-100" style={{ position: "relative" }}>
				<Row>
					<div className={classes.container}>
						<h3 className={classes.title}>Wybrana pizza:</h3>
						<ListGroup>
							{isCustomPizzaSubmitted && (
								<CustomPizzaHeader ingredients={ingredients} />
							)}
						</ListGroup>
						<Button
							className="d-inline custom-button btn-secondary"
							onClick={this.cancelIngredients}
						>
							{"Anuluj"}
						</Button>
					</div>
					<AvailablePizzerias
						isCustomPizza={isCustomPizzaSubmitted}
						choosePizzeria={this.handleChoosePizzeria}
						isPizzeriaSelected={isPizzeriaSelected}
						selectedPizzeria={selectedPizzeria}
						unselectPizzeria={this.handleUnselectPizzeria}
					/>
				</Row>
			</Container>
		);
	}
}

export default withStyles(styles)(CompleteOrderPage);
