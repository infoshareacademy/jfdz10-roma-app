import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { withStyles } from "@material-ui/core/styles";

import CustomPizzaHeader from "./CustomPizzaHeader/CustomPizzaHeader";
// import AvailablePizzerias from "./AvailablePizzerias/AvailablePizzerias";

const styles = theme => ({
	container: {
		width: "100%",
		height: "100%",
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
		ingredients: []
	};

	componentDidMount() {
		this.setState({ ingredients: getFromLocalStorage("ingredients") });
	}

	cancelIngredients = () => {
		window.localStorage.clear();
		this.props.submitPizza();
		this.props.history.push("/create-pizza");
	};

	render() {
		const { classes, isCustomPizzaSubmitted } = this.props;
		const { ingredients } = this.state;

		return (
			<Container className="h-100" style={{ position: "relative" }}>
				<Row className="h-100">
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
					<div>{/* <AvailablePizzerias /> */}</div>
				</Row>
			</Container>
		);
	}
}

export default withStyles(styles)(CompleteOrderPage);
