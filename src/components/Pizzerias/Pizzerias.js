import React, { Component } from "react";
import PizzeriasList from "./PizzeriasList";
import "./pizzerias.css";

class Pizzerias extends Component {
	state = {
		pizzerias: [],
		pizzasFromMenu: []
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

	selectPizzaFromMenu = pizzaObj => {
		const { pizzasFromMenu } = this.state

		if (pizzasFromMenu) {
			if (!pizzasFromMenu.some(pizza => pizza.ingredients === pizzaObj.ingredients)) {
				this.setState({
					...this.state,
					pizzasFromMenu: [
						...this.state.pizzasFromMenu,
						pizzaObj
					]
				})
			} else {
				const filteredPizzasFromMenu = pizzasFromMenu.filter(pizza => pizza.ingredients !== pizzaObj.ingredients)
				this.setState({
					...this.state,
					pizzasFromMenu: filteredPizzasFromMenu
				})
			}
		}
	}

	isPizzaChecked = pizzaObj => {
		const { pizzasFromMenu } = this.state
		return pizzasFromMenu.some(pizza => pizza.ingredients === pizzaObj.ingredients)
	}

	// setItemToLocalStorage = pizzaObj => {
	// 	if (localStorage.getItem("pizzasFromMenu") !== null) {
	// 	  let pizzasFromMenu = JSON.parse(localStorage.getItem("pizzasFromMenu"));
	// 	  if (!pizzasFromMenu.some(pizza => pizza.ingredients === pizzaObj.ingredients)) {
	// 		  pizzasFromMenu.push(pizzaObj);
	// 		  localStorage.setItem("pizzasFromMenu", JSON.stringify(pizzasFromMenu));
	// 	  } else {
	// 		  console.log(pizzasFromMenu)
	// 	  }
	//   } else {
	// 	  const pizzasFromMenu = [pizzaObj];
	// 	  localStorage.setItem("pizzasFromMenu", JSON.stringify(pizzasFromMenu));
	//   }
	// }

	render() {
		const { user } = this.props;
		return (
			<div className="pizzerias__container">
				<PizzeriasList 
					setItemToLS = {this.selectPizzaFromMenu} 
					user={user} 
					isPizzaChecked={this.isPizzaChecked}
					{...this.props} 
				/>
			</div>
		);
	}
}

export default Pizzerias;
