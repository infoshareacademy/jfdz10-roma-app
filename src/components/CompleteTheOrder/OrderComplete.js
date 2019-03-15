import React from "react";
import ChoseIngredients from "./ChosenIngredients";

class OrderComplete extends React.Component {
    render() {
        return (
        <div className="orderComplete">
            <h1 className="orderComplete__title">Wybrane przez ciebie składniki to:</h1>
            <ChoseIngredients />
        </div>
        )
    }
}

export default OrderComplete;