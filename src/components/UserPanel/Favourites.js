import React, { Component } from "react";
import { ListContainer, ListWrapper } from "../CreatePizza/containers";
import "../CreatePizza/ListScrollbar.css";
import "../CreatePizza/containers.css";

class Favourites extends Component {
	state = {
		pizzerias: JSON.parse(localStorage.getItem('favPizzeria'))
	};
	componentDidMount() {
		console.log(this.state.pizzerias)
	}
	render() {
		return (
			<ListContainer>
				<h3 className="list-header"><span role="img" aria-label="pizzeria">🏠 </span>Twoje ulubione pizzerie:</h3><br />
				<ListWrapper className="list-scrollbar">
					<div className="list-group">
						{this.state.pizzerias.map((pizzeria, i) => {
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
										<h5>
											{this.state.pizzerias[i].name}
										</h5>
									</div>
									<span>Kontakt: {this.state.pizzerias[i].contactInfo.phone}&nbsp;&nbsp;&nbsp;
										<a href={"http://" + this.state.pizzerias[i].contactInfo.website}>{this.state.pizzerias[i].contactInfo.website}</a>
									</span>
								</div>
							);
						})}
					</div>
				</ListWrapper>
			</ListContainer>
		);
	}
}

export default Favourites;
