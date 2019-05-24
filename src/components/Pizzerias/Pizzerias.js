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

	setItemToLocalStorage = pizzaObj => {
		if (localStorage.getItem("pizzasFromMenu") !== null) {
		  let pizzasFromMenu = JSON.parse(localStorage.getItem("pizzasFromMenu"));
		  if (!pizzasFromMenu.some(pizza => pizza.ingredients === pizzaObj.ingredients)) {
			  pizzasFromMenu.push(pizzaObj);
			  localStorage.setItem("pizzasFromMenu", JSON.stringify(pizzasFromMenu));
		  } 
	  } else {
		  const pizzasFromMenu = [pizzaObj];
		  localStorage.setItem("pizzasFromMenu", JSON.stringify(pizzasFromMenu));
	  }
	}

	render() {
		const { user } = this.props;
		return (
			<div className="pizzerias__container">
				<PizzeriasList 
					setItemToLS = {this.setItemToLocalStorage} 
					user={user} 
					{...this.props} 
				/>
			</div>
		);
	}
}

export default Pizzerias;
