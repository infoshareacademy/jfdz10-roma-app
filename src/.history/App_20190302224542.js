import React from "react";
import Nav from "./components/Nav/Nav";
import { BrowserRouter } from "react-router-dom";
import MainContent from "./components/Nav/MainContent";
import styled from "styled-components";

const AppContainer = styled.div`
	display: flex;
	height: 100vh;
	width: 100%;
`;

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<AppContainer>
					<Nav />
					<MainContent />
				</AppContainer>
			</BrowserRouter>
		);
	}
}

export default App;