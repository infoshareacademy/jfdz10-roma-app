import React from "react";
import "./styles.css"

class RegisterButton extends React.Component {
    render() {
        return <button 
        id="btn-register"
        type="button" 
        className="btn btn-outline-danger btn-lg btn-lg shadow p-3 mb-5 rounded" 
        style={{"width": "15rem", "margin": "1rem"}}>
            Zarejestruj się
        </button>
    }
}

export default RegisterButton;