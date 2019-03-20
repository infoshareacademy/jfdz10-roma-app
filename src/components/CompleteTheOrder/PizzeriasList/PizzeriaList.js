import React, { Component }from "react";
import { createSorter } from "./sort"
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import "./styles.css";

/*class PizzeriaList extends Component {  
    state = {
        pizzerias: []
    }
    componentDidMount() {
        fetch('pizzerias.json')
        .then (resp => resp.json())
        .then (pizzerias => this.setState({pizzerias}))
    }



    render() {

        return <Tab.Container id="list-group-tabs-example list-group-tabs-pizzerias" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
          
            <ListGroup >
            {
                this.state.pizzerias.map(pizzeria => {
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
              this.state.pizzerias.map(pizzeria => {
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
      </Tab.Container>;
               
    }
};*/

class PizzeriaList extends Component {
    state = { 
        sorters: this.props.sorters
    }

    static defaultProps = {
        sorters: [{
          property: 'name'
        }, {
          property: 'contactInfo'
        }]
      };
    
  
    componentDidMount () {
      fetch('pizzerias.json')
        .then(res => res.json())
        .then(this.onLoad);
    }
  
    parseData(data) {
        const { sorters } = this.state;

        if (data && data.length) {
            if (Array.isArray(sorters) && sorters.length) {
              data.sort(createSorter(...sorters));
            }
          }
      
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
  
    renderData (data) {
      if (data && data.length > 0) {
        return (
          <Tab.Container id="list-group-tabs-example list-group-tabs-pizzerias" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
          
            <ListGroup >
            {
                data.map(pizzeria => {
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
