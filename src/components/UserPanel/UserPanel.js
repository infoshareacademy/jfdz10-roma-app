import React from "react";
import SayHello from "./SayHello";
import UserData from "./UserData";
import Favourites from "./Favourites";
import UserOrders from "./UserOrders";
import "./UserPanel.css";
import "./UserData.css";

class User extends React.Component {
	render() {
		const { user } = this.props;

		return (
			<div className="user__container">
				<div className="user__container__left">
					<SayHello />
					<UserData />
					<UserOrders />
				</div>
				<div className="user__container__right">
					<Favourites user={user} />
				</div>
			</div>
		);
	}
}

export default User;
