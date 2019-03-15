import React from "react";

const getFromLocalStorage = item => {
	return JSON.parse(window.localStorage.getItem(item));
};

class ChosenIngredients extends React.Component {
    state = {
        ingredients: window.localStorage.getItem("ingredients")
    ? getFromLocalStorage("ingredients")
    : []
    }
    render() {
        return (
        <div>
            <h2>Wybrane przez ciebie składniki:</h2>
            <ul className="completeTheOrderIngredientsList">{this.state.ingredients.map(ingredient => <li>{ingredient.name}</li>)}</ul>
        </div>
        )}
}

export default ChosenIngredients;