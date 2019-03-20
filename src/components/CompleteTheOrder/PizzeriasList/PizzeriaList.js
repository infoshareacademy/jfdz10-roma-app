import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./styles.css";
import { FaHeart } from "react-icons/fa";

const styles = {
	RightPane: {
		background: "white",
		border: "1px solid lightgray",
		borderRadius: "5px",
		padding: "15px"
	},
	FavIconEnabled: {
		float: "right",
		color: "#cc1a37"
	},
	FavIconDisabled: {
		float: "right",
		color: "#919191"
	}
};

function searchFor (term) {
    return function(x) {
        return x.name.toLowerCase().includes(term.toLowerCase());
    }
}

class PizzeriaList extends Component {
	state = {}
  
    componentDidMount () {
      fetch('pizzerias.json')
        .then(res => res.json())
        .then(this.onLoad);
    }
  
    parseData (data) {
        return data;
    }
  
    onLoad = (data) => {
      this.setState({
        data: this.parseData(data)
      });
    }
  
    render () {
      const { data } = this.state;
  
      return data ?
        this.renderData(data) :
        this.renderLoading()
	}
	
	constructor(props){
        super(props)
            this.state = {
                data: this.data,
                term: '',
            }
            this.searchHandler = this.searchHandler.bind(this);
        }
    
    searchHandler (event) {
        this.setState({term: event.target.value})
    }


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
	};

	favIconMarked = pizzeria => {
		if (localStorage.getItem("favPizzeria") !== null) {
			let favPizzerias = JSON.parse(localStorage.getItem("favPizzeria"));
			return favPizzerias.some(fav => fav.name === pizzeria.name);
		}
	};

	renderData (pizzerias) {
		if (pizzerias.length > 0) {
		  return (
		  <div>
		  	<form style={{ display: "flex", flexFlow: "column", height: "100%", alignItems: "center", margin: "10px auto", borderRadius: "2px",}}>
                <label style={{fontSize: "2rem", textAlign: "center", padding: "7px"}}>WYSZUKAJ PIZZERIE:<br /><input style={{border: "2px dashed #cc3333"}} type= "text" onChange={this.searchHandler}></input></label>
				<span style={{background: "#f1cd7c", width: "100%", textAlign: "center", padding: "3px"}}>Zacznij wpisywać nazwę pizzeri</span>
            </form>
			<Container
				style={{display: "flex", height: "100%", alignItems: "center", padding: "1rem" }}
			>
				<Tab.Container
					id="list-group-tabs-example list-group-tabs-pizzerias"
					defaultActiveKey="#link1"
				>
					<Row
						style={{ display: "flex", justifyContent: "center", width: "100%" }}
					>
						<Col sm={4}>
							<ListGroup>
								{pizzerias.filter(searchFor(this.state.term)).map(pizzeria => {
									return (
										<ListGroup.Item
											className
											key={pizzeria.id}
											action
											href={`#${pizzeria.id}`}
										>
											{pizzeria.name}
											<FaHeart
												onClick={() => this.selectFavPizzeria(pizzeria)}
												style={
													this.favIconMarked(pizzeria)
														? styles.FavIconEnabled
														: styles.FavIconDisabled
												}
											/>
										</ListGroup.Item>
									);
								})}
							</ListGroup>
						</Col>
						<Col sm={4} style={styles.RightPane}>
							<Tab.Content>
								{" "}
								{pizzerias.map(pizzeria => {
									return (
										<Tab.Pane key={pizzeria.id} eventKey={`#${pizzeria.id}`}>
											<h1>{pizzeria.name}</h1>
											<p>{pizzeria.contactInfo.address.street}</p>
											<p>{pizzeria.contactInfo.address.postcode}</p>
											<p>{pizzeria.contactInfo.phone}</p>
											<p>{pizzeria.contactInfo.website}</p>
										</Tab.Pane>
									);
								})}
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
			</div>         
        )}
     else {
        return console.log("hi")(<h1 style={{display: "block", backgroundColor: "green"}}>Nie znaleźliśmy żadnej pizzeri :(</h1>)
      }
    }
  
    renderLoading () {
      return <div>Loading...</div>
    }
  }

export default PizzeriaList;
