import React, { Component } from "react";
import { ListContainer, ListWrapper } from "../CreatePizza/containers";
import "../CreatePizza/ListScrollbar.css";
import "../CreatePizza/containers.css";

async function fetchPizzerias() {
	return await fetch("pizzerias.json").then(res => res.json());
}

class Favourites extends Component {
	state = {
		pizzerias: []
	};
	componentDidMount() {
		fetchPizzerias().then(pizzerias => this.setState({ pizzerias }));
	}
	render() {
		return (
			<ListContainer>
				<h3 className="list-header">Twoje ulubione pizzerie:</h3><br />
				<ListWrapper className="list-scrollbar">
					<div className="list-group">
						{this.state.pizzerias.map(pizzeria => {
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
										<h5 className="mb-1">
											Ulubiona pizzeria
										</h5>
									</div>
									<p className="mb-1">
										Kontakt: 
									</p>
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
