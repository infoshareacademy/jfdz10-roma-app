import React from 'react';

class EditProfile extends React.Component {
    render (){
        return(
            <div className="buttons__container">
                <div className="button">
                    <span>Edytuj Profil</span>
                </div>
                <div className="button">
                    <span>Dodaj pizzerię</span>
                </div>
            </div>
        )
    }
}

export default EditProfile;
