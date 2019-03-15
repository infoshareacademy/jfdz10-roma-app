import React from 'react';
import Avatar from './Avatar';
import UserData from './UserData';
import Favourites from './Favourites';

import './user.css';

class User extends React.Component {
    state = {
        name: "",
    }
    componentDidMount(){
        fetch('user.json')
            .then(response => response.json())
            .then(value => this.setState({name: value.name}))
    }
    
    render (){
        return(
            <div className="user__container">
                <div className="user__container__left">
                    <h1 className="sayHello"><span role="img" aria-label="pizza">🍕</span> Witaj {this.state.name}!</h1>
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