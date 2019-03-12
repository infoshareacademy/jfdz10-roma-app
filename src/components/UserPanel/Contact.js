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
                <h4>e-mail: {this.state.email}</h4>
                <h4>adres: {this.state.address}</h4>
                <h4>telefon: {this.state.phone} </h4>
            </>
        )
    }
}

export default Contact;