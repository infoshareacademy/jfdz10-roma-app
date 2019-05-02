import React from "react"

class LogInButton extends React.Component {
    render() {
        return <button 
        type="button" 
        className="btn btn-outline-danger btn-lg shadow p-3 mb-5 rounded " 
        style={{"width": "20rem",
        "marginTop":"1rem"
            }}>
            Zaloguj się
        </button>
    }
}

export default LogInButton;