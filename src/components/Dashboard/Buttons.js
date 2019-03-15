import React from "react"
import LogInButton from "./ButtonLogin";
import RegisterButton from "./RegisterButton";

class Buttons extends React.Component {
    render() {
        return (
        <div className="dashboardButtons">
            <LogInButton />
            <RegisterButton/>
        </div>
        )
    }
}

export default Buttons;