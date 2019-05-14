import React from "react";
//import { db } from "../../index";

const BarChart = require("react-chartjs").Bar;

class Chart1 extends React.Component {
//   state = {};

//   componentDidMount() {
//     db.ref("users")
//       .once("value")
//       .then(snapshot => {
//         console.log(snapshot.val());
//     
//       });
//   }
  

  render() {
    const chartData = {
      labels: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziala"],
      datasets: [
        {
          label: "Nowi użytkownicy",
          fillColor: "rgb(105,168,104)",
          strokeColor: "rgb(101, 163, 100)",
          pointColor: "rgb(238,193,90)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [8, 16, 13, 16, 21, 27, 29, 38]
        },
        
      ]
    };
    return <BarChart className="chart" data={chartData} />;
  }
}

export default Chart1;
