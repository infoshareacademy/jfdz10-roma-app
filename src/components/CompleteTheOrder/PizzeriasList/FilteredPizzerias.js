import React from "react";

class filterForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        pizzeriaFilter: ""
      }
    }
    
    handleChange = (e) => {
      this.setState({
        pizzeriaFilter: e.target.value
      })
      this.props.onChange(event.target.value)
    }
    
    render() {
      return (
        <div>
          <label htmlFor="filter">Filter by Pizzeria: </label>
          <input type="text" id="filter" 
            value={this.state.pizzeriaFilter} 
            onChange={this.handleChange}/>
        </div>
        )
    }
  }
  