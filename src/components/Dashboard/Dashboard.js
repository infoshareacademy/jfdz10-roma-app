import React from "react";
import RegisterButton from "./RegisterButton";
import CreateYourPizzaCard from "./CreateYourPizzaCard";
import Chart1 from "./Chart";
import Chart2 from "./Chart2";
import LogInButton from "./ButtonLogin";


class Dashboard extends React.Component {
    render() {
        return (
        <div className="dashboard" style={{"backgroundImage": "url(/img/background.jpg)", "backgroundSize": "100% 100%"}}>
                
                <div className="jumbotron-fluid text-center">
                    <h1 className="display-3" style={{"textShadow":"4px 4px 2px rgba(150, 150, 150, 1)"}}>PIZZERIUM!</h1>
                    <p className="lead">Aplikacja, które pomoże ci znaleźć twoją wymarzoną pizzę</p>
                    <a href="#" role="button"><RegisterButton/></a>
                    <a href="#" role="button"><LogInButton /></a>
                </div>

            <div className="container">

                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center" style={{"padding": "1rem"}}>
                        <CreateYourPizzaCard />
                    </div>
                    <div className="col-md-6" style={{"height":"30rem"}}>Nasze statystyki:
                        <div className="row">
                            <div className="col-md-12" style={{"height":"15rem", "padding":"2rem"}}>
                                <Chart1 />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{"height":"15rem", "padding":"2rem"}}>
                                <Chart2 />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>        
        )
    }
}

export default Dashboard; 