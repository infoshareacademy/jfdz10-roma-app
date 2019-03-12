import React from 'react';

class Contact extends React.Component {
    state = {
        email: "",
        address: "",
        phone: "",
    }
    componentDidMount(){
        fetch('user.json')
            .then(response => response.json())
            .then(value => this.setState({ email: value.email, address: `${value.address.street} ${value.address.postcode}`, phone: value.phone}))
    }
    render (){
        return(
            <>
                <h2><span role="img" aria-label="phone">📞</span> Kontakt: </h2>
                <h3>e-mail: {this.state.email}</h3>
                <h3>adres: {this.state.address}</h3>
                <h3>telefon: {this.state.phone} </h3>
            </>
        )
    }
}

export default Contact;