import React from "react";
import Chart from "../Dashboard/Chart";
import CreateYourPizzaCard from "./CreateYourPizzaCard";
import GoToPizzeriasCard from "./GoToPizzeriasCard"

class ChartCarousel extends React.Component {
    render() {
        return (
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                         <img class="d-block w-100" src="../img/ready-pizza.jpg" alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="../img/pizza3.jpg" alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="../img/own-pizza.jpg" alt="Third slide"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChartCarousel;
                        