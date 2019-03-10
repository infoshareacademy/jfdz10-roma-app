import React from 'react';

class Contact extends React.Component {
    state = {
        email: "",
        address: "",
    }
    componentDidMount(){
        fetch('user.json')
            .then(response => response.json())
            .then(value => this.setState({ email: value.email, address: `${value.address.street} ${value.address.postcode}`}))
    }
    render (){
        return(
            <>
                <h1>Kontakt: </h1>
                <h3>e-mail: {this.state.email}</h3>
                <h3>adres: {this.state.address}</h3>
                <h3>telefon: </h3>
            </>
        )
    }
}

export default Contact;