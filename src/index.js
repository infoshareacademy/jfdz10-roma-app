import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./components/styles.css";
import firebase from "firebase";
import * as serviceWorker from "./serviceWorker";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";

var config = {
	apiKey: "AIzaSyD7yz7cO_zErgoHDdBF-kV6BqfScEWAa2s",
	authDomain: "roma-app-244f3.firebaseapp.com",
	databaseURL: "https://roma-app-244f3.firebaseio.com",
	projectId: "roma-app-244f3",
	storageBucket: "roma-app-244f3.appspot.com",
	messagingSenderId: "978059724629"
};
firebase.initializeApp(config);

const theme = createMuiTheme({
	palette: {
		primary: { main: "rgb(255, 211, 131)" },
		secondary: { main: "rgb(255, 60, 0)" }
	},
	typography: {
		useNextVariants: true,
	},
});

ReactDOM.render(
	<Router>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Router>,
	document.getElementById("root")
);

serviceWorker.unregister();
