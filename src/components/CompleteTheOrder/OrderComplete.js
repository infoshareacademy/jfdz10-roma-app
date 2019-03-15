import React from "react";
import ChoseIngredients from "./ChosenIngredients";

import "./CompleteTheOrder.css"

class OrderComplete extends React.Component {
    render() {
        return (
        <div className="orderComplete">
            <h1 className="orderComplete__title">Złożyłeś już swoją pizzę!</h1>
            <ChoseIngredients />
        </div>
        )
    }
}

export default OrderComplete;