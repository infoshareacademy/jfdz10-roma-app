import React from "react";
import firebase from "firebase";
import MainNav from "./components/Nav/MainNav";
import { BrowserRouter } from "react-router-dom";
import MainContent from "./components/Nav/MainContent";
import styled from "styled-components";

var config = {
	apiKey: "AIzaSyD7yz7cO_zErgoHDdBF-kV6BqfScEWAa2s",
	authDomain: "roma-app-244f3.firebaseapp.com",
	databaseURL: "https://roma-app-244f3.firebaseio.com",
	projectId: "roma-app-244f3",
	storageBucket: "roma-app-244f3.appspot.com",
	messagingSenderId: "978059724629"
};

firebase.initializeApp(config);
export const db = firebase.database();

const AppContainer = styled.div`
	display: flex;
	height: 100vh;
	width: 100%;
`;

const getFromLocalStorage = item => {
	return JSON.parse(window.localStorage.getItem(item));
};

class App extends React.Component {
	state = {
		isPizzaSubmitted: window.localStorage.isPizzaSubmitted
			? JSON.parse(window.localStorage.isPizzaSubmitted)
			: false,
		user: null,
		userDatabase: null,
		isPizzeriaSubmitted: getFromLocalStorage("selectedPizzeria") ? true : false,
		previousOrder: null,
		otherOrder: false
	};

	componentDidMount() {
		const ref = firebase.auth().onAuthStateChanged(user => {
			this.setState({
				...this.state,
				user
			});

			this.setState({
				...this.state,
				ref
			});
		});
	}

	componentWillUnmount() {
		this.state.ref && this.state.ref();
	}

	handleSubmitPizza = bool => {
		this.setState({
			isPizzeriaSubmitted: false,
			isPizzaSubmitted: bool
		});
	};

	handleSubmitSelectedPizzeria = () => {
		this.setState({
			...this.state,
			isPizzeriaSubmitted: !this.state.isPizzeriaSubmitted
		});
	};

	setUserData = user => {
		this.setState({ ...this.state, userDatabase: user });
	};

	makeOrder = () => {
		this.setState({
			...this.state,
			isPizzaSubmitted: false,
			isPizzeriaSubmitted: false,
			previousOrder: null,
			otherOrder: false
		});
	};

	selectPreviousOrder = order => {
		this.setState({
			...this.state,
			previousOrder: order,
			otherOrder: true
		});
	};

	render() {
		const {
			isPizzaSubmitted,
			user,
			isPizzeriaSubmitted,
			userDatabase
		} = this.state;
		return (
			<BrowserRouter>
				<AppContainer>
					<MainNav isPizzaSubmitted={isPizzaSubmitted} />
					<MainContent
						submitPizza={this.handleSubmitPizza}
						isPizzaSubmitted={isPizzaSubmitted}
						user={user}
						handleSubmitSelectedPizzeria={this.handleSubmitSelectedPizzeria}
						isPizzeriaSubmitted={isPizzeriaSubmitted}
						setUserData={this.setUserData}
						userData={userDatabase}
						makeOrder={this.makeOrder}
						selectPreviousOrder={this.selectPreviousOrder}
					/>
				</AppContainer>
			</BrowserRouter>
		);
	}
}

export default App;
