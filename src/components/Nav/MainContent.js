import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import CreatePizza from "../CreatePizza/CreatePizza";
import User from "../UserPanel/User";

const Content = styled.div`
	width: 100%;
	height: 100vh;
	background: #e2e2e2;
`;

const MainContent = () => {
	return (
		<Content>
			<Route path="/dashboard" component={() => <h1>Dashboard</h1>} />
			<Route path="/create-pizza" component={CreatePizza} />
			<Route path="/user-panel" component={ User } />
			<Route path="/make-order" component={() => <h1>Make the order</h1>} />
			<Route
				path="/summary-order"
				component={() => <h1>Summary the order</h1>}
			/>
		</Content>
	);
};

export default MainContent;
