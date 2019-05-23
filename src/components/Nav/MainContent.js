import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import CompleteOrderPage from "../CompleteTheOrder/Page/CompleteOrderPage";
import Dashboard from "../Dashboard/Dashboard";
import CreatePizza from "../CreatePizza/CreatePizza";
import UserPanel from "../UserPanel/UserPanel";
import Pizzerias from "../Pizzerias/Pizzerias";
import SummaryOrder from "../SummaryTheOrder/SummaryOrder";

const Content = styled.div`
	width: 100%;
	height: 100vh;
	background: #e2e2e2;
	background-image: url(img/background.jpg);
	background-size: cover;
`;

const MainContent = props => {
	const {
		submitPizza,
		isPizzaSubmitted,
		user,
		handleSubmitSelectedPizzeria,
		isPizzeriaSubmitted,
		setUserData,
		userData
	} = props;
	return (
		<Content>
			<Route exact path="/" component={Dashboard} />
			<Route
				path="/pizzerias"
				render={props => <Pizzerias user={user} {...props} />}
			/>
			<Route
				path="/user-panel"
				render={() => <UserPanel user={user} setUserData={setUserData} />}
			/>
			<Route
				path="/create-pizza"
				render={props => <CreatePizza {...props} submitPizza={submitPizza} />}
			/>
			<Route
				path="/make-order"
				component={props => (
					<CompleteOrderPage
						{...props}
						isCustomPizzaSubmitted={isPizzaSubmitted}
						submitPizza={submitPizza}
						handleSubmitSelectedPizzeria={handleSubmitSelectedPizzeria}
						isPizzeriaSubmitted={isPizzeriaSubmitted}
					/>
				)}
			/>
			<Route
				path="/summary-order"
				component={props => (
					<SummaryOrder
						user={user}
						userData={userData}
						handleSubmitSelectedPizzeria={handleSubmitSelectedPizzeria}
						{...props}
					/>
				)}
			/>
		</Content>
	);
};

export default MainContent;
