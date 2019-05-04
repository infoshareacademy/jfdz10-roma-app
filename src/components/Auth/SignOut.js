import React from 'react';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';

const SignOut = () => {
    const signOut = () => {
        firebase.auth().signOut();
        window.location.reload();
    };
    return <Button color="secondary" onClick={signOut}>Sign out</Button>
};

export default SignOut; 