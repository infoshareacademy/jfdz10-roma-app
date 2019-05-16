import React from 'react';
import firebase from 'firebase'
import DeleteUser from './DeleteUser'

class Nickname extends React.Component {
    state = {
        authUser: null,
        authUserRegistered: '',
        authUserEmail: '',
        authIsChecked: false,
        showInput: false,
    }

    componentDidMount(){
        const ref = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    authUser: user,
                    authUserId: user.uid,
                    authUserEmail: user.email,
                    authUserRegistered: user.metadata.creationTime,
                    authIsChecked: true,
                })
            }
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
                    this.setState({ 
                        user, 
                        userFirstName: user.name.split(' ')[0] 
                    })
                })
        })
        this.setState({ ref })
    }

    componentWillUnmount(){
        this.state.ref && this.state.ref()
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
        if (this.state.user) { 
            this.setState({ 
                user: {
                    ...this.state.user,
                    street: e.target.value 
                }
            }, () => {
            firebase.database()
                .ref(`users/${this.state.authUserId}`)
                .update({ street: this.state.user.street })
            }) 
        }
    }

    editPhoneNum = (e) => { 
        if (this.state.user) { 
            this.setState({ 
                user: {
                    ...this.state.user,
                    phone: e.target.value 
                }
            }, () => {
                firebase.database()
                .ref(`users/${this.state.authUserId}`)
                .update({ phone: this.state.user.phone })
            })    
        }
    }

    render () {
        return (
            <div className='user__userdata__container'>
                <h2>
                    <span role="img" aria-label="phone">📞 </span> 
                    Kontakt: 
                </h2>
                <div className='user__userdata__container__data'>
                    <h5>• e-mail: {this.state.authUserEmail}</h5>
                    <h5>• adres: { this.state.user ? this.state.user.street : null }</h5>
                        <div className="change__data__container unvisible">
                            <input 
                                type="text" 
                                value={ this.state.user ? this.state.user.street : '' } 
                                onChange={this.editAddress}>
                            </input><button onClick={this.editUserData}>
                                <span role="img" aria-label="phone">
                                    💾
                                </span>
                            </button>    
                        </div>
                    <h5>• telefon: { this.state.user ? this.state.user.phone : null }</h5>   
                        <div className="change__data__container unvisible">
                            <input 
                                type="text" 
                                value={ this.state.user ? this.state.user.phone : '' } 
                                onChange={this.editPhoneNum}>
                            </input><button onClick={this.editUserData}>
                                <span role="img" aria-label="phone">
                                    💾
                                </span>
                            </button>     
                        </div>
                </div>
                <div>
                    <div onClick={this.editUserData}>
                        <span>Edytuj Profil</span>
                    </div>
                    <DeleteUser />
                </div>        
            </div>
        )
    }
}

export default Nickname;