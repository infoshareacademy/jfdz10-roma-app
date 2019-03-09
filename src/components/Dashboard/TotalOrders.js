import React from "react";

class TotalOrders extends React.Component {

    render() {
       return (
           <div className="totalOrders">
               <h2 className="totalOrders__text">{Math.floor(Math.random()*10000)} wykreowanych pizz!</h2>
               <h2 className="totalOrders__text">{Math.floor(Math.random()*100)} pizzerie współpracują z nami!</h2>
               <h2 className="totalOrders__text">{Math.floor(Math.random()*1000)} zadowolonych użytkowników!</h2>
           </div>
       )
    }
}

export default TotalOrders