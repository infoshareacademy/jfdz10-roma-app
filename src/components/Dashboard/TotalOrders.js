import React from "react";


class TotalOrders extends React.Component {
      
    constructor(props) {
        super(props);
        this.state = { number: 8 };
    }

    tick() {
        this.setState(prevState => ({
          number: prevState.number + 1
        }));
      }

        componentDidMount() {
            this.interval = setInterval(() => this.tick(), 5000);
    }
    
    render() {
       return (
           <div className="totalOrders">
               <h2 className="totalOrders__text1">{124 + this.state.number} wykreowanych pizz!</h2>
               <h2 className="totalOrders__text2">{this.state.number} pizzeri współpracuje z nami!</h2>
               <h2 className="totalOrders__text3">{47 + this.state.number} zadowolonych użytkowników!</h2>
           </div>
       )
    }
}

export default TotalOrders