import React, { Component }from "react";
import { Link } from "react-router-dom";
import Tab from 'react-bootstrap/Tab'
import ListGroup from 'react-bootstrap/ListGroup'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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

        return <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={4}>
            <ListGroup>
            {
                this.state.pizzerias.map(pizzeria => {
                    return (
                    <ListGroup.Item key={pizzeria.id} action href={`#${pizzeria.id}`}>
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
                    <Tab.Pane key={pizzeria.id} eventKey={`#${pizzeria.id}`}>
                    {pizzeria.contactInfo.address.street}
                    </Tab.Pane>

)

                                })

                    //             {/* <Tab.Pane key={pizzeria.id} eventKey={`#${pizzeria.id}`}>
                    //     {cos}
                    //   </Tab.Pane> */}
            }

            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>;
    }
};

export default PizzeriaList







// {
//     this.state.pizzerias.map(pizzeria => {
//         return (
//         <Tab.Pane key={pizzeria.id} eventKey={`#${pizzeria.id}`}>
//             {pizzeria.contactInfo.address.street}
//           </Tab.Pane>
//         )
//     })
// }