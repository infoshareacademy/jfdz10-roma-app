import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import { withStyles } from "@material-ui/core/styles";
import Button from "react-bootstrap/Button";
import Paper from "@material-ui/core/Paper";
import { db } from "../../../App";

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
		selectedPizzeria: {},
		pizzerias: [],
		loading: false
	};

	componentDidMount() {
		this.setState({ ...this.state, loading: true });
		db.ref("pizzerias")
			.once("value")
			.then(snapshot => {
				const pizzerias = snapshot.val();
				this.setState({
					...this.state,
					isPizzeriaSelected: !!getFromLocalStorage("selectedPizzeria"),
					selectedPizzeria: getFromLocalStorage("selectedPizzeria"),
					ingredients: getFromLocalStorage("ingredients"),
					loading: false,
					pizzerias
				});
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

	submitSelectedPizzeria = () => {
		this.props.handleSubmitSelectedPizzeria();
		this.props.history.push("/summary-order");
	};

	render() {
		const {
			classes,
			isCustomPizzaSubmitted,
			history,
			handleSubmitSelectedPizzeria,
			isPizzeriaSubmitted
		} = this.props;
		const {
			ingredients,
			selectedPizzeria,
			isPizzeriaSelected,
			pizzerias
		} = this.state;
		return isPizzeriaSubmitted ? (
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
						padding: "15px 15px"
					}}
				>
					<h2>Wybrałeś pizzerię!</h2>
					<h3>Przejdź do następnego kroku i złóż zamówienie.</h3>
					<Button
						className="d-inline custom-button btn-secondary"
						style={{
							width: 130,
							height: 35,
							fontSize: 14,
							padding: "5px 7px"
						}}
						onClick={handleSubmitSelectedPizzeria}
					>
						{"Anuluj pizzerię"}
					</Button>
				</Paper>
			</div>
		) : (
			<Container className="h-100" style={{ position: "relative" }}>
				<Row>
					<div className={classes.container}>
						<ListGroup>
							{isCustomPizzaSubmitted && (
								<CustomPizzaHeader
									ingredients={ingredients}
									cancelIngredients={this.cancelIngredients}
									isPizzeriaSelected={isPizzeriaSelected}
								/>
							)}
						</ListGroup>
						<AvailablePizzerias
							history={history}
							isCustomPizza={isCustomPizzaSubmitted}
							choosePizzeria={this.handleChoosePizzeria}
							isPizzeriaSelected={isPizzeriaSelected}
							selectedPizzeria={selectedPizzeria}
							unselectPizzeria={this.handleUnselectPizzeria}
							handleSubmitSelectedPizzeria={handleSubmitSelectedPizzeria}
							ingredients={ingredients}
							pizzerias={pizzerias}
							submitSelectedPizzeria={this.submitSelectedPizzeria}
						/>
					</div>
				</Row>
			</Container>
		);
	}
}

export default withStyles(styles)(CompleteOrderPage);
