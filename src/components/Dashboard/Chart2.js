import React from "react";
import { db } from "../../App";


const PieChart = require("react-chartjs").Pie;


class Chart2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allSoldPizzas: 20,
            customsPizzas: 0,
        }
    }

    componentDidMount() {
        db.ref("customOrders").once("value").then(snapshot => {
            const snapshotVal = snapshot.val() || {};
                this.setState({customsPizzas: snapshotVal})
        })
    }
    
    render() {
        const chart2Data = [
            {
                value: this.state.allSoldPizzas,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Wszystkie pizze"
            },
            {
                value: this.state.customsPizzas,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Pizze użytkowników"
            }
        ]
    return <PieChart className="chart" data={chart2Data} />
 }
}

export default Chart2;