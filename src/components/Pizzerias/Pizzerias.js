import React, { Component } from "react";
import PizzeriasList from "./PizzeriasList";
import "./pizzerias.css";

class Pizzerias extends Component {
	state = {
		pizzerias: []
	};

	_isMounted = false;

	componentDidMount() {
		this._isMounted = true;

		fetch("pizzerias.json")
			.then(resp => resp.json())
			.then(pizzerias => {
				if (this._isMounted) {
					this.setState({ pizzerias });
				}
			});
	}

	componentWillUnmount() {
		this._isMounted = false;
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
