import React from "react";
import { MainNav } from "./MainNav";
import { BrowserRouter } from "react-router-dom";
import MainContent from "./MainContent";
import styled from "styled-components";

const AppContainer = styled.div`
	display: flex;
	height: 100vh;
	width: 100%;
`;

export class App extends React.Component {
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
