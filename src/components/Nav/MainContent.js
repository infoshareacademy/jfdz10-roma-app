import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Description from "../Dashboard/Description";
import PizzaImage from "../Dashboard/PizzaImage"
import TotalOrders from "../Dashboard/TotalOrders";
import LogInButton from "../Dashboard/ButtonLogin";
import LogOutButton from "../Dashboard/ButtonLogout";



const Content = styled.div`
	width: 100%;
	height: 100vh;
	background: white;
`;

const MainContent = () => {
	return (
		<Content>
			<Route path="/dashboard" render={() =>
  				<div>
    				<Description />
    				<PizzaImage />
					<LogInButton />
					<LogOutButton />
					<TotalOrders />
  				</div>
				}/>
			<Route path="/user-panel" component={() => <h1>User Panel</h1>} />
			<Route path="/create-pizza" component={() => <h1>Create Pizza</h1>} />
			<Route path="/make-order" component={() => <h1>Make the order</h1>} />
			<Route
				path="/summary-order"
				component={() => <h1>Summary the order</h1>}
			/>
		</Content>
	);
};

export default MainContent;
