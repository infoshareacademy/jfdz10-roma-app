import React from 'react';
import SayHello from './SayHello'
import UserData from './UserData';
import Favourites from './Favourites';
import './UserPanel.css';
import './UserData.css';

class User extends React.Component {
    render (){
        return(
            <div className="user__container">
                <div className="user__container__left">
                    <SayHello />
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