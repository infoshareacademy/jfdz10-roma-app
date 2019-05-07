import React from 'react';
import firebase from 'firebase'
import Avatar from './Avatar';
import UserData from './UserData';
import Favourites from './Favourites';

import './user.css';

class User extends React.Component {
    state = {
        user: null
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
                this.setState({ 
                    user, 
                    userFirstName: user.name.split(' ')[0] 
                })
            })
    }

    render (){
        return(
            <div className="user__container">
                <div className="user__container__left">
                    <h1 className="sayHello"><span role="img" aria-label="pizza">🍕</span> Witaj {this.state.user ? this.state.userFirstName : 'w Pizzerium'}</h1>
                    <Avatar />
                    <UserData />
                </div>
                <div className="user__container__right">
                    <Favourites />
                </div>
            </div>
        )
    }
}

export default User;