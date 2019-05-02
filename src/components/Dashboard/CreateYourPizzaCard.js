import React from "react";

class CreateYourPizzaCard extends React.Component {
    render() {
        return (
            <div className="card text-center shadow p-3 mb-5 rounded" style={{"width":"30rem", "height":"30rem"}}>
                <img src="img/own-pizza.jpg" className="card-img-top" alt="empty-table"/>
                <div className="card-body">
                    <h5 className="card-title">Kreator pizzy</h5>
                    <p className="card-text">Skorzystaj z kreatora pizzy i stwórz własną pizzę, a my znajdziemy pizzerię, która zrobi ją dla ciebie.</p>
                    <a href="/make-order" className="btn btn-danger">Kreator pizzy</a>
                </div>
            </div>           
        )
    }
}

export default CreateYourPizzaCard;