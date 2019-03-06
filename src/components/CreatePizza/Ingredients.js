import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Wrapper } from "./containers";
import "./ListScrollbar.css";
import ingredients from "../../ingredients.json";

class Ingredients extends Component {
	render() {
		return (
			<Wrapper className="list-scrollbar">
				<h3>Choose ingredients:</h3>
				<ListGroup>
					{ingredients.map(element => (
						<ListGroup.Item>
							<h5
								className="mb-1"
								style={{ color: "#495057", textTransform: "capitalize" }}
							>
								{element.name}
							</h5>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Wrapper>
		);
	}
}

export default Ingredients;
