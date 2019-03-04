import React from 'react';
import AvatarImg from './img/avatar.png'

class Avatar extends React.Component {
    render (){
        return(
            <img className="user__avatar" src={AvatarImg} alt="avatar" />
        )
    }
}

export default Avatar;