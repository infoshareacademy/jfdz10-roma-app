import React, { Component } from "react";
import PizzeriasList from "./PizzeriasList";
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
		const { user } = this.props;

		return (
			<div className="pizzerias__container">
				<PizzeriasList user={user} {...this.props} />
			</div>
		);
	}
}

export default Pizzerias;
