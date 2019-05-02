import React from "react";
import Chart from "../Dashboard/Chart";
import RegisterButton from "./RegisterButton";
import LogInButton from "./ButtonLogin";
import CreateYourPizzaCard from "./CreateYourPizzaCard";
import GoToPizzeriasCard from "./GoToPizzeriasCard";



class Dashboard extends React.Component {
    render() {
        return (
        <div className="dashboard">
                <div className="jumbotron-fluid text-center" style={{"backgroundImage": "url(/img/background.jpg)", "backgroundSize": "100% 100%"}}>

                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center justify-content-sm-center align-items-center">
                            <h1 className="display-2 d-flex justify-content-start text-danger" >PIZZERIUM</h1>   
                        </div>
                        <div className="col-md-6 d-flex justify-content-center">
                            <a href="#"role="button"><RegisterButton/></a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <p className="lead d-flex justify-content-start">ZJEDZ SWOJĄ WYMARZONĄ PIZZĘ</p>  
                        </div>
                        <div className="col-md-6 d-flex justify-content-center">
                            <a href="#" role="button"><LogInButton/></a>
                        </div>
                    </div>
                </div>

            <div className="container">

                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center" style={{"padding": "1rem"}}>
                        <CreateYourPizzaCard/>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center" style={{"padding": "1rem"}}>
                        <GoToPizzeriasCard/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Chart />
                    </div>
                </div>
            </div>
        </div>        
        )
    }
}

export default Dashboard; 