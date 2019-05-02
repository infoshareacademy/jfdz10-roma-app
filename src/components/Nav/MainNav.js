import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ReactSVG from "react-svg";
import { Icon as BaseIcon } from "react-icons-kit";
import { dashboard } from "react-icons-kit/fa/dashboard";
import { user } from "react-icons-kit/fa/user";
import { chart_7_8 as pizza } from "react-icons-kit/ikons/chart_7_8";
import { shoppingCart } from "react-icons-kit/fa/shoppingCart";
import { creditCardAlt } from "react-icons-kit/fa/creditCardAlt";
import { cutlery } from "react-icons-kit/fa/cutlery";
import { withStyles } from "@material-ui/core/styles";
import { MdMenu } from "react-icons/md";
import classNames from "classnames";

const Navigation = styled.div`
	background: #303641;
	color: #8d97ad;
	font-size: 1em;
	letter-spacing: 2px;
	width: 160px;
	height: 100vh;
	line-height: 16px;
	border: none;
`;

const IconCnt = styled.div`
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Text = styled.div`
	font-size: 0.72em;
	text-transform: uppercase;
	text-align: center;
	width: 100%;
	margin-top: 3px;
`;

const NavLink = styled(Link)`
	box-sizing: border-box;
	flex-direction: column;
	display: flex;
	padding: 0;
	color: inherit;
	text-decoration: none;
	width: 100%;
	padding: 8px 12px;
	transition: all 0.3s ease;
	&:hover {
		color: #fff;
		background-color: #a5182e;
		text-decoration: none;
	}
`;

const styles = theme => ({
	menuBtn: {
		display: "none",
		[theme.breakpoints.down("sm")]: {
			display: "block",
			position: "fixed",
			top: 10,
			left: 10,
			fontSize: 50,
			zIndex: 1500,
			color: "black"
		}
	},
	navigation: {
		transition: "all .5s ease",
		[theme.breakpoints.down("sm")]: {
			position: "fixed",
			zIndex: 1000,
			top: 0
		}
	},
	openedNav: {
		[theme.breakpoints.down("sm")]: {
			transform: "translateX(0%)"
		}
	},
	closedNav: {
		[theme.breakpoints.down("sm")]: {
			transform: "translateX(-100%)"
		}
	},
	navItemSelected: {
		backgroundColor: "#cc3333",
		color: "#FFF"
	},
	navDisabled: {
		backgroundColor: "#343743",
		"&:hover": {
			backgroundColor: "#343743"
		}
	},
	iconDisable: {
		color: "#a0a0a0"
	},
	textDisabled: {
		color: "#c4c4c4"
	},
	logo: {
		marginLeft: 10,
		[theme.breakpoints.down("sm")]: {
			marginLeft: 35
		}
	}
});

const Icon = props => <BaseIcon size={32} icon={props.icon} />;

class MainNav extends React.Component {
	state = { selectedPath: "", isNavOpen: null };

	onNavItemSelect = () => {
		this.setState({ selectedPath: window.location.pathname });
	};

	handleOpenNav = () => {
		this.setState({ isNavOpen: !this.state.isNavOpen });
	};

	componentDidMount() {
		this.setState({ selectedPath: window.location.pathname });
	}

	shouldComponentUpdate() {
		if (this.state.selectedPath !== window.location.pathname) {
			this.setState({ selectedPath: window.location.pathname });
		}
		return true;
	}

	render() {
		const isPizzaSubmitted = JSON.parse(
			localStorage.getItem("isPizzaSubmitted")
		);
		const { classes } = this.props;
		const { isNavOpen } = this.state;
		const path = this.state.selectedPath;
		return (
			<Fragment>
				<MdMenu
					className={classes.menuBtn}
					style={isNavOpen ? { color: "white" } : { color: "black" }}
					onClick={this.handleOpenNav}
				/>
				<Navigation
					className={classNames(
						classes.navigation,
						isNavOpen ? classes.openedNav : classes.closedNav
					)}
				>
					<NavLink
						to="/"
						style={{ background: "#303641", margin: "0 10px" }}
						onClick={this.onNavItemSelect}
					>
						<ReactSVG
							src="logo.svg"
							svgStyle={{ width: 90, height: 50 }}
							className={classes.logo}
						/>
					</NavLink>
					<NavLink
						to=""
						onClick={this.onNavItemSelect}
						className={path === "/" ? classes.navItemSelected : null}
					>
						<IconCnt>
							<Icon icon={dashboard} />
						</IconCnt>
						<Text>Strona główna</Text>
					</NavLink>
					<NavLink
						to="/user-panel"
						className={path === "/user-panel" ? classes.navItemSelected : null}
						onClick={this.onNavItemSelect}
					>
						<IconCnt>
							<Icon icon={user} />
						</IconCnt>
						<Text>Twój profil</Text>
					</NavLink>
					<NavLink
						to="/pizzerias#1"
						onClick={this.onNavItemSelect}
						className={path === "/pizzerias" ? classes.navItemSelected : null}
					>
						<IconCnt>
							<Icon icon={cutlery} />
						</IconCnt>
						<Text>Pizzerie</Text>
					</NavLink>
					<NavLink
						to="/create-pizza"
						onClick={this.onNavItemSelect}
						className={
							path === "/create-pizza" ? classes.navItemSelected : null
						}
					>
						<IconCnt>
							<Icon icon={pizza} />
						</IconCnt>
						<Text>Skomponuj pizzę</Text>
					</NavLink>
					<NavLink
						to={isPizzaSubmitted ? "/make-order" : window.location.pathname}
						className={classNames(
							path === "/make-order" ? classes.navItemSelected : null,
							!isPizzaSubmitted ? classes.navDisabled : null
						)}
						onClick={this.onNavItemSelect}
					>
						<IconCnt className={!isPizzaSubmitted ? classes.iconDisable : null}>
							<Icon icon={shoppingCart} />
						</IconCnt>
						<Text className={!isPizzaSubmitted ? classes.textDisabled : null}>
							Złóż zamówienie
						</Text>
					</NavLink>
					<NavLink
						to={isPizzaSubmitted ? "/summary-order" : window.location.pathname}
						className={classNames(
							path === "/summary-order" ? classes.navItemSelected : null,
							!isPizzaSubmitted ? classes.navDisabled : null
						)}
						onClick={this.onNavItemSelect}
					>
						<IconCnt className={!isPizzaSubmitted ? classes.iconDisable : null}>
							<Icon icon={creditCardAlt} />
						</IconCnt>
						<Text className={!isPizzaSubmitted ? classes.textDisabled : null}>
							Podsumowanie zamówienia
						</Text>
					</NavLink>
				</Navigation>
			</Fragment>
		);
	}
}

export default withStyles(styles)(MainNav);
