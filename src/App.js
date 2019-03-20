import React from "react";
import MainNav from "./components/Nav/MainNav";
import { BrowserRouter } from "react-router-dom";
import MainContent from "./components/Nav/MainContent";
import styled from "styled-components";

const AppContainer = styled.div`
	display: flex;
	height: 100vh;
	width: 100%;
`;

class App extends React.Component {
	state = {
		isPizzaSubmitted: window.localStorage.isPizzaSubmitted
			? JSON.parse(window.localStorage.isPizzaSubmitted)
			: false
	};

	handleSubmitPizza = () => {
		console.log("function submit");
		this.setState({
			isPizzaSubmitted: !this.state.isPizzaSubmitted
		});
	};

	render() {
		const { isPizzaSubmitted } = this.state;
		return (
			<BrowserRouter>
				<AppContainer>
					<MainNav isPizzaSubmitted={isPizzaSubmitted} />
					<MainContent submitPizza={this.handleSubmitPizza} />
				</AppContainer>
			</BrowserRouter>
		);
	}
}

export default App;
