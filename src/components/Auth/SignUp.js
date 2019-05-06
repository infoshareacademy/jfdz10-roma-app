import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import firebase from 'firebase';

const styles = theme => ({
    main: {
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 500
        },
    },
    paper: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignUp extends React.Component {
    state = {
        email: '',
        password: '',
        name: '',
        street: '',
        city: '',
        phone: ''
    };
    
    handleChange = (event) => {
        this.setState({
            [event.currentTarget.name]: event.target.value
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const {
            email,
            name,
            street,
            city,
            phone
        } = this.state
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(value => { 
                firebase.database().ref(`users/${value.user.uid}`)
                    .set({
                        email,
                        name,
                        street,
                        city,
                        phone,
                        uid: value.user.uid
                    })
                alert('Registered') })
            .catch(error => { alert(error.message) })
    };

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>

                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Zarejestruj się
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="text">
                                Imię i nazwisko
                            </InputLabel>
                            <Input 
                                id="name" 
                                name="name" 
                                autoFocus 
                                value={this.state.name} 
                                onChange={this.handleChange} 
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="text">
                                Ulica i numer domu
                            </InputLabel>
                            <Input 
                                id="street" 
                                name="street" 
                                autoFocus 
                                value={this.state.street} 
                                onChange={this.handleChange} 
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="text">
                                Miasto
                            </InputLabel>
                            <Input 
                                id="city" 
                                name="city" 
                                autoFocus 
                                value={this.state.city} 
                                onChange={this.handleChange} 
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="text">
                                Telefon
                            </InputLabel>
                            <Input 
                                id="phone" 
                                name="phone" 
                                autoFocus 
                                value={this.state.phone} 
                                onChange={this.handleChange} 
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">
                                Email
                            </InputLabel>
                            <Input 
                                id="email__sign-up" 
                                name="email" 
                                autoFocus 
                                value={this.state.email} 
                                onChange={this.handleChange} 
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">
                                Hasło
                            </InputLabel>
                            <Input 
                                name="password" 
                                type="password" 
                                id="password__sign-up" 
                                value={this.state.password} 
                                onChange={this.handleChange} 
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                        >
                            Załóż konto
                        </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);