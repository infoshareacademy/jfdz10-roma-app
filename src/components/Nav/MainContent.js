import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "../Dashboard/Dashboard";

import CreatePizza from "../CreatePizza/CreatePizza";
import User from "../UserPanel/User";
import OrderComplete from "../CompleteTheOrder/OrderComplete";

const Content = styled.div`
	width: 100%;
	height: 100vh;
	background: #e2e2e2;
`;

const MainContent = () => {
	return (
		<Content>
			<Route path="/dashboard" component={Dashboard}/>
			<Route path="/create-pizza" component={CreatePizza} />
			<Route path="/user-panel" component={ User } />
			<Route path="/make-order" component={OrderComplete} />
			<Route
				path="/summary-order"
				component={() => <h1>Summary the order</h1>}
			/>
		</Content>
	);
};

export default MainContent;
