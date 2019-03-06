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
		isCreatePizza: false
	};

	handleChangeCreatePizza = () => {
		this.setState({
			isCreatePizza: true
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
							<YourPizza />
						) : (
							<Button
								size="lg"
								className="create-pizza-button"
								onClick={this.handleChangeCreatePizza}
								variant="link"
							>
								Create your own pizza
							</Button>
						)}
					</Col>
					<Col className="d-flex justify-content-center align-items-center">
						{this.state.isCreatePizza ? <Ingredients /> : <PreviousOrders />}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default CreatePizza;
