import React from 'react';
import firebase from 'firebase'

class Nickname extends React.Component {
    state = {
        authUser: null,
        authUserRegistered: '',
        authUserEmail: '',
        authIsChecked: false,
        showInput: false,
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>
            this.setState({
                authUser: user,
                authUserId: user.uid,
                authUserEmail: user.email,
                authUserRegistered: user.metadata.creationTime,
                authIsChecked: true,
            }),
        )
        const databaseRef = firebase.database().ref('users')
        databaseRef.once('value')
            .then(snapshot => {
                const snapshotVal = snapshot.val() || {};
                const findUser = Object.keys(snapshotVal)
                    .map(key => ({
                        id: key,
                        ...snapshotVal[key]
                    }))
                    .filter(user => {
                        return user.id === this.state.authUserId
                    })
                const user = findUser[0]
                this.setState({ user })
            })
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
                <span>Data dołączenia: {this.state.authUserRegistered}</span>
                <h2><span role="img" aria-label="phone">📞</span> Kontakt: </h2>
                    <h4>e-mail: {this.state.authUserEmail}</h4>
                    <h4>adres: { this.state.user ? this.state.user.street : null }</h4>
                        <div className="change__data__container unvisible">
                            <input type="text" value={this.state.address} onChange={this.editAddress}></input><button onClick={this.editUserData}>Zatwierdź</button>    
                        </div>
                    <h4>telefon: { this.state.user ? this.state.user.phone : null }</h4>   
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