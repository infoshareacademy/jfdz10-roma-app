import React from 'react';

class Nickname extends React.Component {
    state = {
        nickname: "",
    }
    componentDidMount(){
        fetch('user.json')
            .then(response => response.json())
            .then(value => this.setState({nickname: value.nickname}))
    }
    render (){
        return(
            <h1>Login: {this.state.nickname}</h1> 
        )
    }
}

export default Nickname;