import React from "react";

const PieChart = require("react-chartjs").Pie;

class Chart extends React.Component {

    state = [{totalOrders:''}, {pizzerias:''}];
    componentDidMount(){
        fetch('orders.json')
            .then(response => response.json())
            .then(orders => this.setState({totalOrders: orders.length}))
        fetch('pizzerias.json')
            .then(response => response.json())
            .then(pizzeria => this.setState({pizzerias: pizzeria.length}))
    }
    
    render() {
        const chartData = [
            {
            value: this.state.pizzerias,
            label: "Pizzerie",
            color: "rgb(60, 158, 58)"
            },{
            value: this.state.totalOrders,
            label: "Pizze",
            color: "rgb(241, 173, 13)"
            },{
            value: 127,
            label: "Uzytkownicy",
            color: "#cc3333",
            }
    ]
    return <PieChart className="chart" data={chartData} width="150" height="150"/>
 }
}

export default Chart;