import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./components/styles.css";
import firebase from 'firebase'
import * as serviceWorker from "./serviceWorker";

var config = {
	apiKey: "AIzaSyBqMSwUzjjz2rlSppTH-u666-ipft1IVpI",
	authDomain: "roma-app-e52ca.firebaseapp.com",
	databaseURL: "https://roma-app-e52ca.firebaseio.com",
	projectId: "roma-app-e52ca",
	storageBucket: "roma-app-e52ca.appspot.com",
	messagingSenderId: "183090459904"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
