import React from "react";

const PieChart = require("react-chartjs").Pie;


class Chart2 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allSoldPizzas: 20,
            customsPizzas: 15
        }
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