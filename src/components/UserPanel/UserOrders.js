import React from 'react';
import './UserOrders.css'

class UserOrders extends React.Component {
    state = {  }
    render() { 
        return (
            <div className="user__orders__container">
                <h2>
                    <span role="img" aria-label="orders">📋 </span>
                    Historia zamówień:
                </h2>
                <span>Nie złożyłeś jeszcze żadnego zamówienia.</span>
            </div>
        );
    }
}
 
export default UserOrders;