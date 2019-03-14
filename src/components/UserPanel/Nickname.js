import React from 'react';

class Nickname extends React.Component {
    state = {
        nickname: "",
        registered: "",
    }
    componentDidMount(){
        fetch('user.json')
            .then(response => response.json())
            .then(value => this.setState({nickname: value.nickname, registered: value.registered}))
    }
    render (){
        return(
            <>
                <span>Data dołączenia: {this.state.registered}</span>
                <h2><span role="img" aria-label="user">👤</span> Login: {this.state.nickname}</h2> 
            </>

        )
    }
}

export default Nickname;