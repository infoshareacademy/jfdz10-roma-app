import React from "react"

class RegisterButton extends React.Component {
    render() {
        return <button 
        type="button" 
        className="btn btn-outline-danger btn-lg btn-lg shadow p-3 mb-5 rounded" 
        style={{"width": "15rem", "marginTop":"1.5rem", "marginRight": "1rem"}}>
            Zarejestruj się
        </button>
    }
}

export default RegisterButton;