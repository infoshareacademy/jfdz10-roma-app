import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { SideNav, Nav as BaseNav } from "react-sidenav";
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

const Nav = styled(BaseNav)`
	flex-direction: column;
	padding: 0;
`;

const theme = {
	selectionColor: "#FFF",
	hoverBgColor: "#a5182e",
	selectionBgColor: "#cc3333"
};

const Text = styled.div`
	font-size: 0.72em;
	text-transform: uppercase;
	text-align: center;
	width: 100%;
	margin-top: 3px;
`;

const NavLink = styled(Link)`
	box-sizing: border-box;
	color: inherit;
	text-decoration: none;
	width: 100%;
	height: 100%;
	padding: 8px 12px;
	&:hover {
		color: inherit;
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
		[theme.breakpoints.down("sm")]: {
			marginLeft: 35
		}
	}
});

const Icon = props => <BaseIcon size={32} icon={props.icon} />;

class MainNav extends React.Component {
	state = { selectedPath: "", isNavOpen: null };

	onItemSelection = arg => {
		if (arg.id !== null) {
			this.setState({ selectedPath: window.location.pathname });
		}
	};

	handleOpenNav = () => {
		this.setState({ isNavOpen: !this.state.isNavOpen });
	};

	render() {
		const isPizzaSubmitted = JSON.parse(
			localStorage.getItem("isPizzaSubmitted")
		);
		const { classes } = this.props;
		const { isNavOpen } = this.state;

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
					<SideNav
						defaultSelectedPath={window.location.pathname}
						theme={theme}
						onItemSelection={this.onItemSelection}
					>
						<Nav id="logo" style={{ background: "#303641", margin: "0 10px" }}>
							<NavLink to="/" style={{ margin: "auto" }}>
								<ReactSVG
									src="logo.svg"
									svgStyle={{ width: 90, height: 50 }}
									className={classes.logo}
								/>
							</NavLink>
						</Nav>
						<Nav id="/dashboard">
							<NavLink to="">
								<IconCnt>
									<Icon icon={dashboard} />
								</IconCnt>
								<Text>Strona główna</Text>
							</NavLink>
						</Nav>
						<Nav id="/user-panel">
							<NavLink to="/user-panel">
								<IconCnt>
									<Icon icon={user} />
								</IconCnt>
								<Text>Twój profil</Text>
							</NavLink>
						</Nav>
						<Nav id="/pizzerias">
							<NavLink to="/pizzerias#1">
								<IconCnt>
									<Icon icon={cutlery} />
								</IconCnt>
								<Text>Pizzerie</Text>
							</NavLink>
						</Nav>
						<Nav id="/create-pizza">
							<NavLink to="/create-pizza">
								<IconCnt>
									<Icon icon={pizza} />
								</IconCnt>
								<Text>Skomponuj pizzę</Text>
							</NavLink>
						</Nav>
						<Nav
							id={isPizzaSubmitted ? "/make-order" : false}
							className={!isPizzaSubmitted ? classes.navDisabled : null}
						>
							<NavLink
								to={isPizzaSubmitted ? "/make-order" : window.location.pathname}
							>
								<IconCnt
									className={!isPizzaSubmitted ? classes.iconDisable : null}
								>
									<Icon icon={shoppingCart} />
								</IconCnt>
								<Text
									className={!isPizzaSubmitted ? classes.textDisabled : null}
								>
									Złóż zamówienie
								</Text>
							</NavLink>
						</Nav>
						<Nav
							id={isPizzaSubmitted ? "/summary-order" : false}
							className={!isPizzaSubmitted ? classes.navDisabled : null}
						>
							<NavLink
								to={
									isPizzaSubmitted ? "/summary-order" : window.location.pathname
								}
							>
								<IconCnt
									className={!isPizzaSubmitted ? classes.iconDisable : null}
								>
									<Icon icon={creditCardAlt} />
								</IconCnt>
								<Text
									className={!isPizzaSubmitted ? classes.textDisabled : null}
								>
									Podsumowanie zamówienia
								</Text>
							</NavLink>
						</Nav>
					</SideNav>
				</Navigation>
			</Fragment>
		);
	}
}

export default withStyles(styles)(MainNav);
