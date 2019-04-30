import React, { Component } from "react";
import PizzeriasList from "./PizzeriasList";
import "../SharedComponents/ListScrollbar.css";
import "../CreatePizza/containers.css";
import "./pizzerias.css";

class Pizzerias extends Component {
	state = {
		pizzerias: []
	};
	componentDidMount() {
		fetch("pizzerias.json")
			.then(resp => resp.json())
			.then(pizzerias => this.setState({ pizzerias }));
	}
	render() {
		return (
			<div className="user__container">
				<PizzeriasList {...this.props} />
			</div>
		);
	}
}

export default Pizzerias;
