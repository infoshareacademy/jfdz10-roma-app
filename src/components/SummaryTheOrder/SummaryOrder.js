import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import firebase from "firebase";

const styles = theme => ({
	wrapper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		marginTop: 15
	},
	header: {
		width: "100%"
	},
	ingredientsWrapper: {
		maxWidth: 250,
		width: "100%"
	},
	pizzeriaWrapper: {
		maxWidth: 250,
		width: "100%"
	},
	pizzeria: {
		padding: 15,
		textAlign: "center"
	}
});

const getFromLocalStorage = item => {
	return JSON.parse(window.localStorage.getItem(item));
};

class SummaryOrder extends Component {
	state = {
		user: this.props.user,
		pizzeria: getFromLocalStorage("selectedPizzeria"),
		ingredients: getFromLocalStorage("ingredients"),
		authUser: null,
		authUserRegistered: "",
		authUserEmail: "",
		authIsChecked: false
	};

	_isMounted = false;

	componentDidMount() {
		this._isMounted = true;

		const ref = firebase.auth().onAuthStateChanged(user => {
			if (user && this._isMounted) {
				this.setState({
					...this.state,
					authUser: user,
					authUserId: user.uid,
					authUserEmail: user.email,
					authUserRegistered: user.metadata.creationTime,
					authIsChecked: true
				});
			}
			const databaseRef = firebase.database().ref("users");
			databaseRef.once("value").then(snapshot => {
				const snapshotVal = snapshot.val() || {};
				const findUser = Object.keys(snapshotVal)
					.map(key => ({
						id: key,
						...snapshotVal[key]
					}))
					.filter(user => {
						return user.id === this.state.authUserId;
					});
				const user = findUser[0];
				if (user && this._isMounted) {
					this.setState({
						user,
						userFirstName: user.name.split(" ")[0]
					});
				}
			});
		});
		this.setState({ ref });
	}

	componentDidUpdate(prevProps) {
		if (this.state.user !== prevProps.user) {
			this.setState({ ...this.state, user: this.props.user });
		}
	}

	componentWillUnmount() {
		this.state.ref && this.state.ref();
		this._isMounted = false;
	}

	render() {
		const { pizzeria, ingredients, user, authUserEmail } = this.state;
		const { classes } = this.props;
		return (
			<Fragment>
				<h1 className={classes.header}>Podsumowanie zamówienia</h1>
				<div className={classes.wrapper}>
					<div className={classes.ingredientsWrapper}>
						<h2>Wybrane składniki: </h2>
						<div className={classes.ingredients}>
							<ul>
								{ingredients.map((el, i) => {
									return (
										<li key={i} style={{ fontSize: 16 }}>
											{el.name}
										</li>
									);
								})}
							</ul>
						</div>
					</div>
					<div className={classes.pizzeriaWrapper}>
						<h2>Wybrana pizzeria: </h2>
						<Paper className={classes.pizzeria}>
							<h2>{pizzeria.name}</h2>
							<p>{pizzeria.contactInfo.address.street}</p>
							<p>
								{pizzeria.contactInfo.address.postcode}{" "}
								{pizzeria.contactInfo.address.city}
							</p>
							<p>{pizzeria.contactInfo.phone}</p>
							<p>{pizzeria.contactInfo.website}</p>
						</Paper>
					</div>
					<div className={classes.contactWrapper}>
						<Paper className={classes.contact}>
							{user && (
								<Fragment>
									<p>email: {authUserEmail}</p>
									<p>Adres dostawy: {user.street}</p>
								</Fragment>
							)}
						</Paper>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(styles)(SummaryOrder);
