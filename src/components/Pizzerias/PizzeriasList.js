import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { FaHeart } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import "./pizzerias.css";

const styles = theme => ({
	RightPane: {
		background: "white",
		border: "1px solid lightgray",
		borderRadius: "5px",
		padding: "12px",
		overflowY: "hidden"
	},
	FavIconEnabled: {
		float: "right",
		color: "#cc1a37"
	},
	FavIconDisabled: {
		float: "right",
		color: "#919191"
	},
	success: {
		backgroundColor: "#33ab4e"
	},
	close: {
		padding: theme.spacing.unit / 2,
		"&:focus": {
			outline: "none"
		}
	},
	item: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		paddingLeft: 0,
		paddingTop: 0,
		paddingBottom: 0
	},
	link: {
		display: "inline-block",
		color: "inherit",
		width: "100%",
		padding: "12px 15px",
		"&:hover": {
			color: "inherit"
		}
	}
});

function searchFor(term) {
	return function(x) {
		return x.name.toLowerCase().includes(term.toLowerCase());
	};
}

class PizzeriasList extends Component {
	state = {
		pizzas: [],
		data: [],
		isSnackbarOpen: false,
		snackbarMessage: "",
		pizzeriaLocation: "#1"
	};

	componentDidMount() {
		fetch("pizzas.json")
			.then(res => res.json())
			.then(pizzas => this.setState({ pizzas }));
		fetch("pizzerias.json")
			.then(res => res.json())
			.then(data => {
				this.setState({ data });
				const currentPizzeria = this.props.location.hash;
				const defaultPizzeria = this.state.pizzeriaLocation;
				if (currentPizzeria !== defaultPizzeria) {
					this.setState({ pizzeriaLocation: currentPizzeria });
				}
			})
			.catch(error => console.log(error.message));
	}

	handleClickFavBtn = message => {
		this.setState({
			...this.state,
			isSnackbarOpen: true,
			snackbarMessage: message
		});
	};

	handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		this.setState({ ...this.state, isSnackbarOpen: false });
	};

	render() {
		const { data } = this.state;
		const { classes } = this.props;

		return data ? this.renderData(data, classes) : this.renderLoading();
	}

	constructor(props) {
		super(props);
		this.state = {
			data: this.data,
			term: "",
			pizzeriaLocation: "#1"
		};
		this.searchHandler = this.searchHandler.bind(this);
	}

	searchHandler(event) {
		this.setState({ term: event.target.value });
	}

	selectFavPizzeria = pizzeria => {
		if (localStorage.getItem("favPizzeria") !== null) {
			let favPizzerias = JSON.parse(localStorage.getItem("favPizzeria"));
			if (!favPizzerias.some(fav => fav.name === pizzeria.name)) {
				favPizzerias.push(pizzeria);
				localStorage.setItem("favPizzeria", JSON.stringify(favPizzerias));
				this.handleClickFavBtn("Dodano do ulubionych");
			} else {
				const removedFavPizzeria = favPizzerias.filter(
					fav => fav.name !== pizzeria.name
				);
				localStorage.setItem("favPizzeria", JSON.stringify(removedFavPizzeria));
				this.handleClickFavBtn("Usunięto z ulubionych");
			}
		} else {
			const favPizzeria = [pizzeria];
			localStorage.setItem("favPizzeria", JSON.stringify(favPizzeria));
		}
	};

	favIconMarked = pizzeria => {
		if (localStorage.getItem("favPizzeria") !== null) {
			let favPizzerias = JSON.parse(localStorage.getItem("favPizzeria"));
			return favPizzerias.some(fav => fav.name === pizzeria.name);
		}
	};

	changeLocation = id => {
		this.setState({ pizzeriaLocation: `#${id}` });
	};

	renderData(pizzerias, classes) {
		const location = this.state.pizzeriaLocation;
		const { snackbarMessage } = this.state;

		return (
			<div
				style={{ display: "flex", flexFlow: "column", alignItems: "center" }}
			>
				<form
					onSubmit={e => e.preventDefault()}
					style={{
						display: "flex",
						width: "100vw",
						flexFlow: "column",
						height: "18vh",
						margin: "4px",
						borderRadius: "1px"
					}}
				>
					<label
						style={{ fontSize: "1.7rem", textAlign: "center", padding: "3px" }}
					>
						WYSZUKAJ PIZZERIĘ:
						<br />
						<input
							className="pizzerias-filter-input"
							style={{}}
							type="text"
							onChange={this.searchHandler}
						/>
					</label>
					<span
						style={{
							background: "#f1cd7c",
							width: "100%",
							textAlign: "center",
							padding: "4px"
						}}
					>
						Zacznij wpisywać nazwę pizzerii
					</span>
				</form>

				<Container
					style={{
						display: "flex",
						height: "80vh",
						alignItems: "top",
						padding: "1rem"
					}}
				>
					<Tab.Container
						id="list-group-tabs-example list-group-tabs-pizzerias"
						// defaultActiveKey={location}
						activeKey={location}
						onSelect={() => null}
					>
						<Row
							style={{
								display: "flex",
								justifyContent: "center",
								width: "100%",
								maxHeight: "510px"
							}}
						>
							<Col sm={3}>
								<ListGroup>
									{pizzerias
										.filter(searchFor(this.state.term))
										.map(pizzeria => {
											return (
												<div
													key={pizzeria.id}
													className="pizzerias__list__item"
												>
													<ListGroup.Item action className={classes.item}>
														<Nav.Link
															href={`#${pizzeria.id}`}
															className={classes.link}
															onClick={() => this.changeLocation(pizzeria.id)}
														>
															<span>{pizzeria.name}</span>
														</Nav.Link>
														<FaHeart
															onClick={() => this.selectFavPizzeria(pizzeria)}
															className={
																this.favIconMarked(pizzeria)
																	? classes.FavIconEnabled
																	: classes.FavIconDisabled
															}
														/>
													</ListGroup.Item>
												</div>
											);
										})}
								</ListGroup>
							</Col>
							<Col sm={8} className={classes.RightPane}>
								<Tab.Content>
									{pizzerias.map(pizzeria => {
										return (
											<Tab.Pane
												key={pizzeria.id}
												eventKey={`#${pizzeria.id}`}
												className="pizzeriasList__columns__container"
											>
												<div className="pizzeriasList__column__left">
													<div className="pizzeriasList__data">
														<h1>{pizzeria.name}</h1>
														<p>
															Adres: {pizzeria.contactInfo.address.street},
															<br />
															{pizzeria.contactInfo.address.postcode}&nbsp;
															{pizzeria.contactInfo.address.city}
														</p>
														<p>Kontakt: {pizzeria.contactInfo.phone}</p>
														<a
															target="_blank"
															rel="noopener noreferrer"
															href={"http://" + pizzeria.contactInfo.website}
														>
															{pizzeria.contactInfo.website}
														</a>
													</div>
												</div>
												<div className="pizzeriasList__column__right">
													<h1>Menu:</h1>
													<div className="pizzeriasList__column__right__pizzas">
														{this.state.pizzas.map(pizza => {
															return (
																<p key={Math.random()}>
																	<input type="checkbox" /> {pizza.pizzaName} (
																	{pizza.price} zł)
																</p>
															);
														})}
													</div>
													<div className="pizzeriasList__column__right__button">
														Zamów
													</div>
												</div>
											</Tab.Pane>
										);
									})}
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
				</Container>
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					open={this.state.isSnackbarOpen}
					autoHideDuration={4000}
					onClose={this.handleCloseSnackbar}
				>
					<SnackbarContent
						className={classes.success}
						message={
							<span style={{ fontSize: "1.1rem" }}>{snackbarMessage}</span>
						}
						action={[
							<IconButton
								key="close"
								aria-label="Close"
								color="inherit"
								className={classes.close}
								onClick={this.handleCloseSnackbar}
							>
								<CloseIcon />
							</IconButton>
						]}
					/>
				</Snackbar>
			</div>
		);
	}

	renderLoading() {
		return <div>Loading...</div>;
	}
}

export default withStyles(styles)(PizzeriasList);
