import React from "react";
import LogInButton from "./ButtonLogin";

class CreateYourPizzaCard extends React.Component {
    render() {
        return (
            <div className="card text-center shadow mb-5" style={{"width":"30rem", "height":"30rem"}}>
                <img src="img/ready-pizza.jpg" className="card-img-top" alt="pizza"/>
                <div className="card-body">
                    <h5 className="card-text" style={{"padding-bottom":"1rem",}}>Skorzystaj z kreatora pizzy i stwórz własną pizzę, a my znajdziemy pizzerię, która zrobi ją dla ciebie albo znajdź już gotową pizzę w jednej z naszych pizzerii.</h5>
                    <LogInButton/>
                </div>
            </div>           
        )
    }
}

export default CreateYourPizzaCard;