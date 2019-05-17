import React from "react";
import "./styles.css"

class LogInButton extends React.Component {
    render() {
        return <button 
        id="btn-login"
        type="button" 
        className="btn btn-outline-danger btn-lg btn-lg shadow p-3 mb-5 rounded" 
        style={{"width": "15rem", "margin":"1rem"}}>
            Zaloguj się
        </button>
    }
}

export default LogInButton;