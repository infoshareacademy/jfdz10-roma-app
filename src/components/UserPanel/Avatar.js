import React from 'react';

class Avatar extends React.Component {
    state = {
        avatar: "",
    }
    componentDidMount(){
        fetch('user.json')
            .then(response => response.json())
            .then(value => this.setState({ avatar: value.avatar }))
    }
    render (){
        return(
            <img className="user__avatar" src={this.state.avatar} alt="avatar" />
        )
    }
}

export default Avatar;
