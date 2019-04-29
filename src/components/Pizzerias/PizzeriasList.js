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
import classNames from "classnames";
import "./styles.css";
import "../SharedComponents/ListScrollbar.css";

const styles = theme => ({
	RightPane: {
		background: "white",
		border: "1px solid lightgray",
		borderRadius: "5px",
		padding: "12px",
		overflowY: "auto"
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
		isSnackbarOpen: false
	};

	componentDidMount() {
		fetch("pizzerias.json")
			.then(res => res.json())
			.then(this.getData);
	}

	parseData(data) {
		return data;
	}

	getData = data => {
		console.log(data);
		this.setState({
			data: this.parseData(data)
		});
	};

	handleClickFavBtn = () => {
		this.setState({ isSnackbarOpen: true });
	};

	handleCloseSnackbar = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		this.setState({ isSnackbarOpen: false });
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
			term: ""
		};
		this.searchHandler = this.searchHandler.bind(this);
	}

	searchHandler(event) {
		this.setState({ term: event.target.value });
	}

	selectFavPizzeria = pizzeria => {
		this.handleClickFavBtn();

		if (localStorage.getItem("favPizzeria") !== null) {
			let favPizzerias = JSON.parse(localStorage.getItem("favPizzeria"));
			if (!favPizzerias.some(fav => fav.name === pizzeria.name)) {
				favPizzerias.push(pizzeria);
				localStorage.setItem("favPizzeria", JSON.stringify(favPizzerias));
			} else {
				const removedFavPizzeria = favPizzerias.filter(
					fav => fav.name !== pizzeria.name
				);
				localStorage.setItem("favPizzeria", JSON.stringify(removedFavPizzeria));
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

	renderData(pizzerias, classes) {
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
						defaultActiveKey="#link1"
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
															// eventKey={`#${pizzeria.id}`}
															href={`#${pizzeria.id}`}
															className={classes.link}
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
							<Col
								sm={8}
								className={classNames(classes.RightPane, "list-scrollbar")}
							>
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
															href={"http://" + pizzeria.contactInfo.website}
														>
															{pizzeria.contactInfo.website}
														</a>
													</div>
													<div className="pizzeriasList__map" />
												</div>
												<div className="pizzeriasList__column__right">
													<h1>Menu:</h1>
													<li>Margherita</li>
													<h6>&nbsp;&nbsp;Lista składników</h6>
													<li>Neapolitana</li>
													<h6>&nbsp;&nbsp;Lista składników</h6>
													<li>Capriciosa</li>
													<h6>&nbsp;&nbsp;Lista składników</h6>
													<li>Salami</li>
													<h6>&nbsp;&nbsp;Lista składników</h6>
													<li>Wegetariańska</li>
													<h6>&nbsp;&nbsp;Lista składników</h6>
													<li>Sycylijska</li>
													<h6>&nbsp;&nbsp;Lista składników</h6>
													<li>Bella</li>
													<h6>&nbsp;&nbsp;Lista składników</h6>
													<li>Własna</li>
													<h6>&nbsp;&nbsp;Lista składników</h6>
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
							<span style={{ fontSize: "1.1rem" }}>Dodano do ulubionych!</span>
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
