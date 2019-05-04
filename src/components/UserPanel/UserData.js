import React from 'react';
import firebase from 'firebase'

class Nickname extends React.Component {
    state = {
        user: null,
        isChecked: false,
        registered: "",
        email: "",
        address: JSON.parse(localStorage.getItem('userAddress')),
        phone: JSON.parse(localStorage.getItem('userPhone')),
        showInput: false,
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>
            this.setState({
                user,
                registered: user.metadata.creationTime,
                email: user.email,
                isChecked: true
            })
        )

        if (!this.state.address || !this.state.phone) { 
                this.editUserData()
                setTimeout(alert('Uzupełnij profil'), 5000)    
        }
    }

    editUserData = () => {
        const doInputsShow = this.state.showInput;
        this.setState( { 
            showInput: !doInputsShow 
        });
        let inputs = document.querySelectorAll(".change__data__container");
        if (this.state.showInput) {
            inputs.forEach( input => input.classList.add("unvisible"));
        } else {
            inputs.forEach( input => input.classList.remove("unvisible"));
        }
    }

    editAddress = (e) => { 
        this.setState({ address: e.target.value }) 
        localStorage.setItem('userAddress', JSON.stringify(this.state.address))
    }

    editPhoneNum = (e) => { 
        this.setState({ phone: e.target.value }) 
        localStorage.setItem('userPhone', JSON.stringify(this.state.phone))
    }

    render (){
        return(
            <>
                <span>Data dołączenia: {this.state.registered}</span>
                <h2><span role="img" aria-label="phone">📞</span> Kontakt: </h2>
                    <h4>e-mail: {this.state.email}</h4>
                    <h4>adres: {this.state.address}</h4>
                        <div className="change__data__container unvisible">
                            <input type="text" value={this.state.address} onChange={this.editAddress}></input><button onClick={this.editUserData}>Zatwierdź</button>    
                        </div>
                    <h4>telefon: {this.state.phone} </h4>   
                        <div className="change__data__container unvisible">
                            <input type="text" value={this.state.phone} onChange={this.editPhoneNum}></input><button onClick={this.editUserData}>Zatwierdź</button>    
                        </div>
                <div className="buttons__container">
                    <div className="button" onClick={this.editUserData}>
                        <span>Edytuj Profil</span>
                    </div>
                    <div className="button">
                        <span>Dodaj pizzerię</span>
                    </div>
                </div>        
            </>

        )
    }
}

export default Nickname;