import React from "react";
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
	aligh-items: center;
`;

const Nav = styled(BaseNav)`
	flex-direction: column;
	padding: 0;
`;

const theme = {
	selectionColor: "#FFF",
	hoverBgColor: "#181b20",
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
`;

const Icon = props => <BaseIcon size={32} icon={props.icon} />;

class Nav extends React.Component {
	state = { selectedPath: "dashboard" };

	onItemSelection = arg => {
		this.setState({ selectedPath: arg.path });
	};

	render() {
		return (
			<Navigation>
				<SideNav
					defaultSelectedPath="dashboard"
					theme={theme}
					onItemSelection={this.onItemSelection}
				>
					<Nav id="logo" style={{ background: "#303641", margin: "10px" }}>
						<NavLink to="/dashboard" style={{ margin: "auto" }}>
							<ReactSVG src="logo.svg" svgStyle={{ width: 90, height: 50 }} />
						</NavLink>
					</Nav>
					<Nav id="dashboard">
						<NavLink to="/dashboard">
							<IconCnt>
								<Icon icon={dashboard} />
							</IconCnt>
							<Text>Dashboard</Text>
						</NavLink>
					</Nav>
					<Nav id="userPanel">
						<NavLink to="/user-panel">
							<IconCnt>
								<Icon icon={user} />
							</IconCnt>
							<Text>User Panel</Text>
						</NavLink>
					</Nav>
					<Nav id="pizza">
						<NavLink to="/create-pizza">
							<IconCnt>
								<Icon icon={pizza} />
							</IconCnt>
							<Text>Create Pizza</Text>
						</NavLink>
					</Nav>
					<Nav id="order">
						<NavLink to="/make-order">
							<IconCnt>
								<Icon icon={shoppingCart} />
							</IconCnt>
							<Text>Make Order</Text>
						</NavLink>
					</Nav>
					<Nav id="summary">
						<NavLink to="/summary-order">
							<IconCnt>
								<Icon icon={creditCardAlt} />
							</IconCnt>
							<Text>Summary the order</Text>
						</NavLink>
					</Nav>
				</SideNav>
			</Navigation>
		);
	}
}

export default Nav;
