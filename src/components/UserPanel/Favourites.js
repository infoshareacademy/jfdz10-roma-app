import React, { Component, Fragment } from "react";
import { ListContainer, ListWrapper } from "../SharedComponents/containers";
import { FaHeart } from "react-icons/fa";
import "./Favourites.css";
import { db } from "../../App";

const styles = {
	FavIconEnabled: {
		float: "right",
		color: "#cc1a37"
	},
	FavIconDisabled: {
		float: "right",
		color: "#919191"
	}
};

class Favourites extends Component {
	state = {
		user: null,
		favPizzerias: [],
		isFetchFavPizzerias: false,
		isFetchInProgress: false
	};

	componentDidMount() {
		this.fetchFavPizzerias();
	}

	componentDidUpdate(prevProps) {
		if (this.props.user !== prevProps.user) {
			this.fetchFavPizzerias();
			this.setState({ ...this.state, user: this.props.user });
		}
	}

	fetchFavPizzerias = () => {
		const { user } = this.props;
		if (user) {
			db.ref(`users/${user.uid}/favourites`)
				.once("value")
				.then(snapshot => {
					const favourites = snapshot.val() || [];
					this.setState({
						...this.state,
						favPizzerias: favourites,
						isFetchFavPizzerias: true
					});
				})
				.catch(err => console.log(err.message));
		}
	};

	favIconMarked = pizzeria => {
		const { favPizzerias } = this.state;
		if (favPizzerias.length) {
			return favPizzerias.some(fav => fav.name === pizzeria.name);
		}
	};

	render() {
		const { favPizzerias } = this.state;

		return (
			<ListContainer>
				<h2 className="user__favourites__header list-header">
					<span role="img" aria-label="pizzeria">
						🏠&nbsp;
					</span>
					Ulubione pizzerie:
				</h2>
				<ListWrapper className="list-scrollbar">
					<div className="list-group">
						{favPizzerias.map((pizzeria, i) => {
							return (
								<Fragment>
									<div
										key={pizzeria.id}
										className="list-group-item list-group-item-action flex-column align-items-start"
										style={{
											overflowWrap: "break-word",
											wordWrap: "break-word"
										}}
									>
										<div className="d-flex w-100 justify-content-between">
											<h5>{favPizzerias[i].name}</h5>
											<FaHeart
												onClick={() => this.selectFavPizzeria(pizzeria)}
												style={
													this.favIconMarked(pizzeria)
														? styles.FavIconEnabled
														: styles.FavIconDisabled
												}
											/>
										</div>
										<span>
											Kontakt: {favPizzerias[i].contactInfo.phone}
											&nbsp;&nbsp;&nbsp;
											<a href={"http://" + favPizzerias[i].contactInfo.website}>
												{favPizzerias[i].contactInfo.website}
											</a>
										</span>
									</div>
									{/* <div className="list-group-item user__favourites__pizzerias">
										<img alt="pizzeria" src="img/user__pizzeria.jpg" />
										<p>Nie dodałeś jeszcze ulubionych pizzerii.</p>
									</div> */}
								</Fragment>
							);
						})}
					</div>
				</ListWrapper>
			</ListContainer>
		);
	}
}

export default Favourites;
