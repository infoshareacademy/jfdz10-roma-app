import React from "react";
import Description from "../Dashboard/Description";
import PizzaImage from "../Dashboard/PizzaImage"
import Chart from "../Dashboard/Chart";
import Buttons from "./Buttons";



class Dashboard extends React.Component {
    render() {
        return (
        <div className="dashboard">
            <div className="dashboard__description">
                <Description />
                <PizzaImage />
            </div>
            <div className="dashboard__bottom">
                <Chart />
			    <Buttons />
                
            </div>
        </div>
        )
    }
}

export default Dashboard; 