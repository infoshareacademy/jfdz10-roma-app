import React from 'react';
import Avatar from './Avatar';
import Nickname from './Nickname';
import Contact from './Contact';
import Favourites from './Favourites';
import AddPizzeria from './AddPizzeria';
// import CreatePizza from '../CreatePizza/CreatePizza.js'

import './user.css';

class User extends React.Component {
    render (){
        return(
            <div className="user__container">
                <div className="user__container__left">
                    <Avatar />
                    <h1 class="sayHello">Witaj Jan!</h1>
                    <Nickname />
                    <Contact />
                    <Favourites />
                    <AddPizzeria />
                </div>
                <div className="user__container__right">
                    {/* <CreatePizza /> */}
                </div>
            </div>
        )
    }
}

export default User;