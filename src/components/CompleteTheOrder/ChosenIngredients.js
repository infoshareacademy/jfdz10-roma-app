import React from "react";

async function fetchPizzerias() {
	return await fetch("pizzerias.json").then(res => res.json());
}

const getFromLocalStorage = item => {
	return JSON.parse(window.localStorage.getItem(item));
};

class ChosenIngredients extends React.Component {
    state = {
        ingredients: window.localStorage.getItem("ingredients")
    ? getFromLocalStorage("ingredients")
    : [],
		pizzerias: [],
	};
    
    componentDidMount() {
		fetchPizzerias().then(pizzerias => this.setState({ pizzerias }));
    }
    
    render() {
        return (
        <div>
            <h2>Wybrane przez ciebie składniki:</h2>
            <ul className="completeTheOrderIngredientsList">{this.state.ingredients.map(ingredient => <li>{ingredient.name}</li>)}</ul>
            <h2>Pizzerie, które zrobią z nich pizze dla ciebie:</h2>
            <ul>{this.state.pizzerias.map(pizzeria =>
                 <li>{pizzeria.ingredients === console.log(this.state.ingredients.name) ? pizzeria.name : []}</li>)}</ul>
        </div>
        )}
}

export default ChosenIngredients;