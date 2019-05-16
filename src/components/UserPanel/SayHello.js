import React from 'react';
import firebase from 'firebase'

class SayHello extends React.Component {
    state = {
        user: null
    }

    componentDidMount(){
        const ref = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    authUser: user,
                    authUserId: user.uid,
                    authUserEmail: user.email,
                    authUserRegistered: user.metadata.creationTime,
                    authIsChecked: true,
                })
            }
            const databaseRef = firebase.database().ref('users')
            databaseRef.once('value')
                .then(snapshot => {
                    const snapshotVal = snapshot.val() || {};
                    const findUser = Object.keys(snapshotVal)
                        .map(key => ({
                            id: key,
                            ...snapshotVal[key]
                        }))
                        .filter(user => {
                            return user.id === this.state.authUserId
                        })
                    const user = findUser[0]
                    this.setState({ 
                        user, 
                        userFirstName: user.name.split(' ')[0] 
                    })
                })
        })
        this.setState({ ref })
    }

    componentWillUnmount(){
        this.state.ref && this.state.ref()
    }

    render() { 
        return (
            <h1 className="user__sayhello">
                <span role="img" aria-label="pizza">🍕</span>&nbsp;
                Witaj {this.state.user ? this.state.userFirstName : null}!
            </h1>
        );
    }
}
 
export default SayHello;