import React from 'react';

class Nickname extends React.Component {
    state = {
        registered: "",
        nickname: "",
        email: "",
        address: "",
        phone: "",
        showInput: false,
    }
    componentDidMount(){
        fetch('user.json')
            .then(response => response.json())
            .then(value => this.setState({nickname: value.nickname, registered: value.registered}))
        fetch('user.json')
            .then(response => response.json())
            .then(value => this.setState({ email: value.email, address: `${value.address.street} ${value.address.postcode} ${value.address.city}`, phone: value.phone}))
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
    render (){
        return(
            <>
                <span>Data dołączenia: {this.state.registered}</span>
                <h2><span role="img" aria-label="user">👤</span> Login: {this.state.nickname}</h2> 
                    <div className="change__data__container unvisible">
                        <input type="text" defaultValue={this.state.nickname}></input><button>Zatwierdź</button>    
                    </div>
                <h2><span role="img" aria-label="phone">📞</span> Kontakt: </h2>
                    <h4>e-mail: {this.state.email}</h4>
                        <div className="change__data__container unvisible">
                            <input type="email" defaultValue={this.state.email}></input><button>Zatwierdź</button>    
                        </div>
                    <h4>adres: {this.state.address}</h4>
                        <div className="change__data__container unvisible">
                            <input type="text" defaultValue={this.state.address}></input><button>Zatwierdź</button>    
                        </div>
                    <h4>telefon: {this.state.phone} </h4>   
                        <div className="change__data__container unvisible">
                            <input type="text" defaultValue={this.state.phone}></input><button>Zatwierdź</button>    
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