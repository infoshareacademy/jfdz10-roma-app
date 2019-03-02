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
	render() {
		return (
			<BrowserRouter>
				<AppContainer>
					<MainNav />
					<MainContent />
				</AppContainer>
			</BrowserRouter>
		);
	}
}

export default App;
