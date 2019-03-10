import React from "react";
import Description from "../Dashboard/Description";
import PizzaImage from "../Dashboard/PizzaImage"
import TotalOrders from "../Dashboard/TotalOrders";
import LogInButton from "../Dashboard/ButtonLogin";
import LogOutButton from "../Dashboard/ButtonLogout";

class Dashboard extends React.Component {
    render() {
        return (
        <div className="dashboard">
            <Description />
            <PizzaImage />
			<LogInButton />
			<LogOutButton />
			<TotalOrders />
        </div>
        )
    }
}

export default Dashboard;