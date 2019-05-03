import React from "react";

const PieChart = require("react-chartjs").Pie;


class Chart2 extends React.Component {
    
    render() {
        const chart2Data = [
            {
                value: 300,
                color:"#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            }
        ]
    return <PieChart className="chart" data={chart2Data} />
 }
}

export default Chart2;