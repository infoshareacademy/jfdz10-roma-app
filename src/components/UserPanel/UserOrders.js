import React from "react";
import "./UserOrders.css";
import firebase from "firebase";

class UserOrders extends React.Component {
	state = {
		user: this.props.user,
		orders: []
	};

	componentDidUpdate(prevProps) {
		if (this.state.user !== prevProps.user) {
			this.setState({ ...this.state, user: this.props.user });
			const { user } = this.props;
			if (user) {
				firebase
					.database()
					.ref(`users/${user.uid}/orders`)
					.once("value")
					.then(snapshot => {
						const ordersObject = snapshot.val();
						const ordersArray = Object.keys(ordersObject).map(key => ({
							id: key,
							...ordersObject[key]
						}));
						this.setState({
							...this.state,
							orders: ordersArray
						});
					});
			}
		}
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
				<span>Nie złożyłeś jeszcze żadnego zamówienia.</span>
			</div>
		);
	}
}

export default UserOrders;
