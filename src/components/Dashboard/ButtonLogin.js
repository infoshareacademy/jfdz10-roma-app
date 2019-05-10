import React from "react"

class LogInButton extends React.Component {
    render() {
        return <button 
        type="button" 
        className="btn btn-outline-danger btn-lg btn-lg shadow p-3 mb-5 rounded" 
        style={{"width": "15rem", "marginTop":"1.5rem"}}>
            Zaloguj się
        </button>
    }
}

export default LogInButton;