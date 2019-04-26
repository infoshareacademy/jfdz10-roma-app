import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./components/styles.css";
import firebase from "firebase";
import * as serviceWorker from "./serviceWorker";

var config = {
	apiKey: "AIzaSyD7yz7cO_zErgoHDdBF-kV6BqfScEWAa2s",
	authDomain: "roma-app-244f3.firebaseapp.com",
	databaseURL: "https://roma-app-244f3.firebaseio.com",
	projectId: "roma-app-244f3",
	storageBucket: "roma-app-244f3.appspot.com",
	messagingSenderId: "978059724629"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
