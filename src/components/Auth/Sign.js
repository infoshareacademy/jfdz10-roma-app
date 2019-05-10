import React from 'react';
import firebase from 'firebase'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './sign.css'

class Sign extends React.Component {
    componentDidMount() {
		this.setState({ selectedPath: window.location.pathname });
		const ref = firebase.auth().onAuthStateChanged(user =>
            this.setState({
                user,
                isChecked: true
            })
        )
        this.setState({ ref })
    }

    componentWillUnmount(){
        this.state.ref && this.state.ref()
    }
    
    render() { 
        return (
            <div className="sign__container">
                <div className="sign__container__components">
                    <SignIn />
                    <SignUp />
                </div>
            </div>
        );
    }
}
 
export default Sign;