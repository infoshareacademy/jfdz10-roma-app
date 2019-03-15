import React from "react";

const LineChart = require("react-chartjs").Line;


class Chart extends React.Component {
    
    render() {
        const chartData ={
            labels: ["Grudzień", "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj"],
            datasets: [
                {
                    label: "Współpracujące z nami pizzerie",
                    fillColor: "rgb(241,205,124)",
                    strokeColor: "rgb(238,193,90)",
                    pointColor: "rgb(238,193,90)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [48, 57, 53, 65, 72, 70]
                },
                {
                    label: "Wykreowana pizze",
                    fillColor: "rgb(230,86,86)",
                    strokeColor: "rgb(204,51,51)",
                    pointColor: "rgb(204,51,51)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [20, 29, 41, 48, 39, 55]
                },
                {
                    label: "Zadowolenie użytkownicy",
                    fillColor: "rgb(105,168,104)",
                    strokeColor: "rgb(80,170,78)",
                    pointColor: "rgb(80,170,78)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(151,187,205,1)",
                    data: [5, 12, 17, 15, 28, 29]
                },
            ]
        };
    return <LineChart className="chart" data={chartData} width="400px" height="200px"/>
 }
}

export default Chart;