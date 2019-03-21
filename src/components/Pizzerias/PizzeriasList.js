import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { FaHeart } from "react-icons/fa";
import "./styles.css";

const styles = {
	RightPane: {
		background: "white",
		border: "1px solid lightgray",
		borderRadius: "5px",
		padding: "15px"
	},
	FavIconEnabled: {
		float: "right",
		color: "#cc1a37"
	},
	FavIconDisabled: {
		float: "right",
		color: "#919191"
	}
};

class PizzeriasList extends Component {
	state = {
		pizzerias: []
	};
	componentDidMount() {
		fetch("pizzerias.json")
			.then(resp => resp.json())
			.then(pizzerias => this.setState({ pizzerias }));
	}
	selectFavPizzeria = pizzeria => {
		if (localStorage.getItem("favPizzeria") !== null) {
			let favPizzerias = JSON.parse(localStorage.getItem("favPizzeria"));
			if (!favPizzerias.some(fav => fav.name === pizzeria.name)) {
				favPizzerias.push(pizzeria);
				localStorage.setItem("favPizzeria", JSON.stringify(favPizzerias));
			} else {
				const removedFavPizzeria = favPizzerias.filter(
					fav => fav.name !== pizzeria.name
				);
				localStorage.setItem("favPizzeria", JSON.stringify(removedFavPizzeria));
			}
		} else {
			const favPizzeria = [pizzeria];
			localStorage.setItem("favPizzeria", JSON.stringify(favPizzeria));
		}
	};

	favIconMarked = pizzeria => {
		if (localStorage.getItem("favPizzeria") !== null) {
			let favPizzerias = JSON.parse(localStorage.getItem("favPizzeria"));
			return favPizzerias.some(fav => fav.name === pizzeria.name);
		}
	};
	render() {
		return (
			<Container style={{ display: "flex", height: "100%", alignItems: "center" }} >
				<Tab.Container
					id="list-group-tabs-example list-group-tabs-pizzerias"
					defaultActiveKey="#link1"
				>
					<Row
						style={{ display: "flex", justifyContent: "center", width: "100%" }}
					>
						<Col sm={3}>
							<ListGroup>
								{this.state.pizzerias.map(pizzeria => {
									return (
										<ListGroup.Item
											className="pizzerias__list__item"
											key={pizzeria.id}
											action href={`#${pizzeria.id}`}
										>
											{pizzeria.name}
											<FaHeart
												onClick={() => this.selectFavPizzeria(pizzeria)}
												style={
													this.favIconMarked(pizzeria)
														? styles.FavIconEnabled
														: styles.FavIconDisabled
												}
											/>
										</ListGroup.Item>
									);
								})}
							</ListGroup>
						</Col>
						<Col sm={8} style={styles.RightPane}>
							<Tab.Content>
								{this.state.pizzerias.map(pizzeria => {
									return (
										<Tab.Pane key={pizzeria.id} eventKey={`#${pizzeria.id}`} className="pizzeriasList__columns__container">
                                            <div className="pizzeriasList__column__left">
                                                <div className="pizzeriasList__data">
                                                    <h1>{pizzeria.name}</h1>
                                                    <p>
                                                        Adres: {pizzeria.contactInfo.address.street},<br />
                                                        {pizzeria.contactInfo.address.postcode}&nbsp;
                                                        {pizzeria.contactInfo.address.city}
                                                    </p>
                                                    <p>Kontakt: {pizzeria.contactInfo.phone}</p>
                                                    <a href={"http://" + pizzeria.contactInfo.website}>{pizzeria.contactInfo.website}</a>
                                                </div>
                                                <div className="pizzeriasList__map">
                                                </div>
                                            </div>
                                            <div className="pizzeriasList__column__right">
                                                <h1>Menu:</h1>
                                                    <li>Margherita</li>
                                                    <h6>&nbsp;&nbsp;Lista składników</h6>
                                                    <li>Neapolitana</li>
                                                    <h6>&nbsp;&nbsp;Lista składników</h6>
                                                    <li>Capriciosa</li>
                                                    <h6>&nbsp;&nbsp;Lista składników</h6>
                                                    <li>Salami</li>
                                                    <h6>&nbsp;&nbsp;Lista składników</h6>
                                                    <li>Wegetariańska</li>
                                                    <h6>&nbsp;&nbsp;Lista składników</h6>
                                                    <li>Sycylijska</li>
                                                    <h6>&nbsp;&nbsp;Lista składników</h6>
                                                    <li>Bella</li>
                                                    <h6>&nbsp;&nbsp;Lista składników</h6>
                                                    <li>Własna</li>
                                                    <h6>&nbsp;&nbsp;Lista składników</h6>
                                            </div>
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

export default PizzeriasList;
