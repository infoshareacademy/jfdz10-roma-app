import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import PizzeriaList from "../CompleteTheOrder/PizzeriasList/PizzeriaList";
import Dashboard from "../Dashboard/Dashboard";
import CreatePizza from "../CreatePizza/CreatePizza";
import UserPanel from "../UserPanel/UserPanel";
import Pizzerias from "../Pizzerias/Pizzerias";

const Content = styled.div`
	width: 100%;
	height: 100vh;
	background: #e2e2e2;
`;

const MainContent = props => {
	const { submitPizza } = props;

	return (
		<Content>
			<Route exact path="/" component={Dashboard} />
			<Route
				path="/create-pizza"
				render={props => <CreatePizza {...props} submitPizza={submitPizza} />}
			/>
			<Route path="/pizzerias" render={props => <Pizzerias {...props} />} />
			<Route path="/user-panel" component={UserPanel} />
			<Route
				path="/make-order"
				component={props => (
					<PizzeriaList {...props} submitPizza={submitPizza} />
				)}
			/>
			<Route
				path="/summary-order"
				component={() => <h1>Summary the order</h1>}
			/>
		</Content>
	);
};

export default MainContent;
