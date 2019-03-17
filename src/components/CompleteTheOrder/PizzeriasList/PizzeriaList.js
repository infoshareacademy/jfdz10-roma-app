import React, { Component }from "react";
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import "./styles.css";

class PizzeriaList extends Component {  
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
};

export default PizzeriaList
