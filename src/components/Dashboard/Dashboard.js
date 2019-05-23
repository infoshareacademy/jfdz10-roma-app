import React, { Component } from "react";
import ButtonRegister from "./ButtonRegister";
import CreateYourPizzaCard from "./CreateYourPizzaCard";
import Chart1 from "./Chart";
import Chart2 from "./Chart2";
import LogInButton from "./ButtonLogin";
import firebase from "firebase";

import "./styles.css";

class Dashboard extends Component {
  state = {
    user: null
};

componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
        this.setState({
            user
        })
    })
}
  render() {
    return (
      <div
        className="dashboard"
        style={{
          backgroundImage: "url(/img/background.jpg)",
          backgroundSize: "100% 100%",
          height: "100%", 
          overflow: "auto",
          display: "flex",
          flexFlow: "column",
          justifyContent: "center"
        }}
      >
        <div className="jumbotron-fluid text-center">
          <h1
            className="display-3"
            id="title"
            style={{ textShadow: "4px 4px 2px rgba(150, 150, 150, 1)" }}
          >
            PIZZERIUM!
          </h1>
          <p className="lead" style={{ letterSpacing: "0.3rem" }}>
            Aplikacja, która pomoże ci znaleźć twoją wymarzoną pizzę
          </p>
          {this.state.user ? <div style={{height: "3rem"}}></div> : <div><LogInButton />
          <ButtonRegister /></div>}
          
        </div>

        <div className="container">
          <div className="row">
            <div
              className="col-md-6 d-flex justify-content-center"
              style={{ padding: "1rem" }}
            >
              <CreateYourPizzaCard />
            </div>
            <div className="col-md-6" style={{ height: "30rem" }}>
              <div className="row">
                <div
                  className="col-md-12"
                  style={{ height: "15rem", padding: "1rem", display: "flex", alignItems: "center", flexDirection: "column"}}
                >
                  <h5>Nowi użytkownicy:</h5>
                  <Chart1 />
                </div>
              </div>
              <div className="row">
                <div
                  className="col-md-12"
                  style={{ height: "15rem", padding: "1rem", display: "flex", alignItems: "center", flexDirection: "column"}}
                >
                  <h5>Sprzedane pizze:</h5>
                  <Chart2 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
