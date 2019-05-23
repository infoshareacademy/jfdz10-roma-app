import React from "react";
import "./UserOrders.css";
import firebase from "firebase";

class UserOrders extends React.Component {
	state = {
		user: this.props.user
	};

	componentDidMount() {
		const { user } = this.state;
		console.log(user);
		if (user) {
			firebase
				.database()
				.ref(`users/${user.uid}/orders`)
				.once("value")
				.then(snapshot => {
					const orders = snapshot.val();
					console.log(orders);
				});
		}
	}

	componentDidUpdate(prevProps) {
		if (this.state.user !== prevProps.user) {
			this.setState({ ...this.state, user: this.props.user });
			const { user } = this.props;
			console.log(user);
			if (user) {
				firebase
					.database()
					.ref(`users/${user.uid}/orders`)
					.once("value")
					.then(snapshot => {
						const orders = snapshot.val();
						console.log(orders);
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
