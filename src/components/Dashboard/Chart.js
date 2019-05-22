import React from "react";
import { db } from "../../App";

const BarChart = require("react-chartjs").Bar;

class Chart1 extends React.Component {
  state = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0
  };

  componentDidMount() {
    db.ref("users").on("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        var weekDay = childData.weekDay;
        console.log(weekDay);
        if (weekDay === "Monday"){
          this.setState({Monday: this.state.Monday +1})
        }
        // var daysArray = [];
        // daysArray.push(weekDay);
        // console.log(daysArray.length);
        
        // daysArray.
        // if (weekDay === "Monday"){

        // }
      });
    });
    console.log(this.state)
  }

  render() {
    const chartData = {
      labels: [
        "Poniedziałek",
        "Wtorek",
        "Środa",
        "Czwartek",
        "Piątek",
        "Sobota",
        "Niedziala"
      ],
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
        }
      ]
    };
    return <BarChart className="chart" data={chartData} />;
  }
}

export default Chart1;
