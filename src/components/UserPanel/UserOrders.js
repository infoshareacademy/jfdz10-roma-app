import React from "react";
import "./UserOrders.css";
import firebase from "firebase";

class UserOrders extends React.Component {
	state = {
		user: this.props.user,
		orders: []
	};

	_isMounted = false;

	componentDidMount() {
		this._isMounted = true;
	}

	componentDidUpdate(prevProps) {
		if (this.state.user !== prevProps.user) {
			if (this._isMounted) {
				this.setState({ ...this.state, user: this.props.user });
			}
			const { user } = this.props;
			if (user) {
				firebase
					.database()
					.ref(`users/${user.uid}/orders`)
					.once("value")
					.then(snapshot => {
						const ordersObject = snapshot.val();
						if (ordersObject) {
							const ordersArray = Object.keys(ordersObject).map(key => ({
								id: key,
								...ordersObject[key]
							}));
							if (this._isMounted) {
								this.setState({
									...this.state,
									orders: ordersArray
								});
							}
						}
					});
			}
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<div className="user__orders__container">
				<h2>
					<span role="img" aria-label="orders">
						📋{" "}
					</span>
					Historia zamówień:
				</h2>
				{this.state.orders === [] 
				? <span>Nie złożyłeś jeszcze żadnego zamówienia.</span>
				: this.state.orders.map(order => {
					return (
					<li key={order.pizzeria.id}> 
						{order.pizzeria.name} ({order.price} zł)
					</li>
					)
				})}
			</div>
		);
	}
}

export default UserOrders;
