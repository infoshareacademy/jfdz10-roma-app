import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./styles.css";
import { FaHeart } from "react-icons/fa";

const styles = {
	RightPane: {
		background: "white",
		border: "1px solid lightgray",
		borderRadius: "5px",
		padding: "15px"
	},
	Icon: {
		float: "right",
		color: "#cc1a37"
	}
};

class PizzeriaList extends Component {
	state = {
		pizzerias: []
	};
	componentDidMount() {
		fetch("pizzerias.json")
			.then(resp => resp.json())
			.then(pizzerias => this.setState({ pizzerias }));
	}

	addPizzeriaToFav = pizzeria => {
		this.setState({
			favPizzeria: pizzeria
		});
		console.log(pizzeria);
	};

	render() {
		return (
			<Container
				style={{ display: "flex", height: "100%", alignItems: "center" }}
			>
				<Tab.Container
					id="list-group-tabs-example list-group-tabs-pizzerias"
					defaultActiveKey="#link1"
				>
					<Row
						style={{ display: "flex", justifyContent: "center", width: "100%" }}
					>
						<Col sm={4}>
							<ListGroup>
								{this.state.pizzerias.map(pizzeria => {
									return (
										<ListGroup.Item
											className
											key={pizzeria.id}
											action
											href={`#${pizzeria.id}`}
										>
											{pizzeria.name}
											<FaHeart
												onClick={() => this.addPizzeriaToFav(pizzeria)}
												style={styles.Icon}
											/>
										</ListGroup.Item>
									);
								})}
							</ListGroup>
						</Col>
						<Col sm={4} style={styles.RightPane}>
							<Tab.Content>
								{" "}
								{this.state.pizzerias.map(pizzeria => {
									return (
										<Tab.Pane key={pizzeria.id} eventKey={`#${pizzeria.id}`}>
											<h1>{pizzeria.name}</h1>
											<p>{pizzeria.contactInfo.address.street}</p>
											<p>{pizzeria.contactInfo.address.postcode}</p>
											<p>{pizzeria.contactInfo.phone}</p>
											<p>{pizzeria.contactInfo.website}</p>
										</Tab.Pane>
									);
								})}
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
		);
	}
}

export default PizzeriaList;
