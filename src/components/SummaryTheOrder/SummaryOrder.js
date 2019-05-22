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
		maxHeight: "100vh",
		overflow: "auto"
	},
	header: {
		width: "100%",
		marginBottom: 15
	},
	ingredientsWrapper: {
		maxWidth: 350,
		width: "100%",
		fontSize: 16
	},
	pizzeriaWrapper: {
		maxWidth: 350,
		width: "100%",
		marginTop: 15,
		fontSize: 16
	},
	pizzeria: {
		padding: 15,
		textAlign: "center"
	},
	contactWrapper: {
		maxWidth: 350,
		width: "100%",
		marginTop: 15,
		fontSize: 16
	},
	contact: {
		padding: 15,
		textAlign: "center",
		fontSize: 16
	},
	info: {
		display: "block",
		fontWeight: "bold"
	},
	priceContainer: {
		maxWidth: 350,
		width: "100%",
		marginTop: 15,
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
		if (this.state.authUser !== prevProps.user) {
			this.setState({ ...this.state, authUser: this.props.user });
		}
	}

	componentWillUnmount() {
		this.state.ref && this.state.ref();
		this._isMounted = false;
	}

	render() {
		const { pizzeria, ingredients, user } = this.state;
		const { classes } = this.props;

		const price = getFromLocalStorage("orderTotalPrice");

		return (
			<div className={classes.wrapper}>
				<h1 className={classes.header}>Podsumowanie zamówienia</h1>
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
						<p>
							Adres:
							<span className={classes.info}>
								{pizzeria.contactInfo.address.street},
								{pizzeria.contactInfo.address.postcode}
								{pizzeria.contactInfo.address.city}
							</span>
						</p>
						<p>
							telefon:
							<span className={classes.info}>{pizzeria.contactInfo.phone}</span>
						</p>
						<p>
							WWW:
							<span className={classes.info}>
								{pizzeria.contactInfo.website}
							</span>
						</p>
					</Paper>
				</div>
				<div className={classes.contactWrapper}>
					<h2>Dane kontaktowe: </h2>
					<Paper className={classes.contact}>
						{user && (
							<Fragment>
								<p>
									Imię i nazwisko:
									<span className={classes.info}>{user.name}</span>
								</p>
								<p>
									email:
									<span className={classes.info}>{user.email}</span>
								</p>
								<p>
									telefon:
									<span className={classes.info}>{user.phone}</span>
								</p>
								<p>
									Adres dostawy:
									<span className={classes.info}>
										{user.street}, {user.city}
									</span>
								</p>
							</Fragment>
						)}
					</Paper>
				</div>
				<div className={classes.priceContainer}>
					<h3>
						Wartość zamówienia:
						<span style={{ display: "block", fontWeight: "bold" }}>
							{price} zł
						</span>
					</h3>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(SummaryOrder);
