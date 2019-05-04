import React from 'react';
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignOut from './SignOut'
import './sign.css'

class Sign extends React.Component {
    render() { 
        return (
            <div className="sign__container">
                <div className="sign__container__components">
                    <SignIn />
                    <SignUp />
                </div>
                <br/>
                <SignOut />
            </div>
        );
    }
}
 
export default Sign;