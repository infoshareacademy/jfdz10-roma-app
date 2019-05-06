import React from 'react';
import Avatar from './Avatar';
import UserData from './UserData';
import Favourites from './Favourites';
import Auth from '../Auth/Auth'

import './user.css';

class User extends React.Component {
    
    render (){
        return(
            <div className="user__container">
                <Auth>
                    <div className="user__container__left">
                        <h1 className="sayHello"><span role="img" aria-label="pizza">🍕</span> Witaj w Pizzerium!</h1>
                        <Avatar />
                        <UserData />
                    </div>
                    <div className="user__container__right">
                        <Favourites />
                    </div>
                </Auth>
            </div>
        )
    }
}

export default User;