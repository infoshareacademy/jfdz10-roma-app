import React, { Component } from "react";
import { ListContainer, ListWrapper } from "../SharedComponents/containers";
import { FaHeart } from "react-icons/fa";
import "./Favourites.css"

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
		pizzerias: JSON.parse(localStorage.getItem("favPizzeria"))
	};

	selectFavPizzeria = pizzeria => {
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
		this.setState({
			pizzerias: JSON.parse(localStorage.getItem("favPizzeria"))
		});
	};

	favIconMarked = pizzeria => {
		if (localStorage.getItem("favPizzeria") !== null) {
			let favPizzerias = JSON.parse(localStorage.getItem("favPizzeria"));
			return favPizzerias.some(fav => fav.name === pizzeria.name);
		}
	};

	render() {
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
						{localStorage.getItem("favPizzeria") !== null
							? this.state.pizzerias.map((pizzeria, i) => {
									return (
										<div
											key={pizzeria.id}
											className="list-group-item list-group-item-action flex-column align-items-start"
											style={{
												overflowWrap: "break-word",
												wordWrap: "break-word"
											}}
										>
											<div className="d-flex w-100 justify-content-between">
												<h5>{this.state.pizzerias[i].name}</h5>
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
												Kontakt: {this.state.pizzerias[i].contactInfo.phone}
												&nbsp;&nbsp;&nbsp;
												<a
													href={
														"http://" +
														this.state.pizzerias[i].contactInfo.website
													}
												>
													{this.state.pizzerias[i].contactInfo.website}
												</a>
											</span>
										</div>
									);
							  })
							: 
							<div className="list-group-item user__favourites__pizzerias">
								<img alt="pizzeria" src="img/user__pizzeria.jpg"/>
								<p>Nie dodałeś jeszcze ulubionych pizzerii.</p>
							</div>
						}	
					</div>
				</ListWrapper>
			</ListContainer>
		);
	}
}

export default Favourites;
