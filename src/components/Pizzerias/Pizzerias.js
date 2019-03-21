import React, { Component } from "react";
import PizzeriasList from './PizzeriasList'
import "../CreatePizza/ListScrollbar.css";
import "../CreatePizza/containers.css";
import "./styles.css";


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
				<PizzeriasList />
			</div>
		);
	}
}

export default Pizzerias;
