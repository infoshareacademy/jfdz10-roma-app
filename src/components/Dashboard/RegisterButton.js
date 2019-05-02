import React from "react"

class RegisterButton extends React.Component {
    render() {
        return <button 
        type="button" 
        className="btn btn-outline-danger btn-lg btn-lg shadow p-3 mb-5 rounded" 
        style={{"width": "20rem", "marginTop":"1.5rem"}}>
            Zarejestruj się
        </button>
    }
}

export default RegisterButton;