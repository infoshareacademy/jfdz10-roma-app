import React, { Component }from "react";
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import "./styles.css";

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

    renderData (data) {
      if (data && data.length > 0) {
        return (
        <div>
            <form>
                <input type= "text" onChange={this.searchHandler}></input>
            </form>
          <Tab.Container id="list-group-tabs-example list-group-tabs-pizzerias" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
          
            <ListGroup >
            {
                data.filter(searchFor(this.state.term)).map(pizzeria => {
                    return (
                    <ListGroup.Item className key={pizzeria.id} action href={`#${pizzeria.id}`}>
                        {pizzeria.name}
                    </ListGroup.Item>
                    )
                })
            }
            </ListGroup>
          </Col>
          <Col sm={8}>
            <Tab.Content> {
              data.map(pizzeria => {
                return (
                    <Tab.Pane key={pizzeria.id}  eventKey={`#${pizzeria.id}`}>
                    <h1>{pizzeria.name}</h1>
                    <p>{pizzeria.contactInfo.address.street}</p>
                    <p>{pizzeria.contactInfo.address.postcode}</p>
                    <p>{pizzeria.contactInfo.phone}</p>
                    <p>{pizzeria.contactInfo.website}</p>
                    </Tab.Pane>
) })
            }
            </Tab.Content>
          </Col>
          
        </Row>    
      </Tab.Container>
      </div>         
        )}
     else {
        return <div>No items found</div>
      }
    }
  
    renderLoading () {
      return <div>Loading...</div>
    }
  }

export default PizzeriaList
