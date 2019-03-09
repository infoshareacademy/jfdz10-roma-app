import React from "react";
import PizzaImg from "../pizza.jpeg"

class PizzaImage extends React.Component {
    render() {
        return <img className="pizzaImage" src={PizzaImg} alt="pizza"></img>}
}

export default PizzaImage;
