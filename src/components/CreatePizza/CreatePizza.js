import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PreviousOrders from "./PreviousOrders";

class CreatePizza extends Component {
	render() {
		return (
			<Container className="h-100">
				<Row className="h-100">
					<Col className="d-flex">1 of 2</Col>
					<Col className="d-flex justify-content-center align-items-center">
						<PreviousOrders />
					</Col>
				</Row>
			</Container>
		);
	}
}

export default CreatePizza;
