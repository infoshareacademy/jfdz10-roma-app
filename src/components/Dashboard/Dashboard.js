import React from "react";
import Description from "../Dashboard/Description";
import PizzaImage from "../Dashboard/PizzaImage"
import TotalOrders from "../Dashboard/TotalOrders";
import LogInButton from "../Dashboard/ButtonLogin";
import RegisterButton from "../Dashboard/RegisterButton";
import Chart from "../Dashboard/Chart";



class Dashboard extends React.Component {
    render() {
        return (
        <div className="dashboard">
            <div className="dashboard__description">
                <Description />
                <PizzaImage />
            </div>
            <div className="dashboard__buttons">
			    <LogInButton />
			    <RegisterButton />
                <Chart />
			    <TotalOrders />
            </div>
        </div>
        )
    }
}

export default Dashboard; 