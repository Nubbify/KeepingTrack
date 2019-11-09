import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, ThemeProvider} from '@material-ui/core/styles'
import {TextField, Typography, Button, createMuiTheme, CssBaseline} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {default: '#1C313A'}
    }
});

const styles = {
    textField1: {
        marginTop: 150,
        alignItems: 'center',
        justify: 'center',
        alignText: 'center',
        color: theme.palette.text.primary
    },
    textField2: {
        marginBottom: 20,
        alignItems: 'center',
        justify: 'center',
        alignText: 'center',
        color: theme.palette.text.primary
    },
    textField: {
        alignItems: 'center',
        justify: 'center',
        alignText: 'center',
        color: theme.palette.text.primary
    },
    button: {
        margin: '15',
        backgroundColor: theme.palette.primary.light
    }
};

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
        };

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    login = () => {
    };

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    render() {
        const {theme} = this.props;
        const {email, password} = this.state;
        const values = {email, password};
        const classes = this.props.classes;
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField1}
                            label={'Email'}
                            variant={'outlined'}
                            floatingLabelText={'Email'}
                            onChange={this.handleChange('email')}
                            defaultValue={values.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField2}
                            label={'Password'}
                            variant={'outlined'}
                            floatingLabelText={'Password'}
                            onChange={this.handleChange('password')}
                            defaultValue={values.password}
                        />
                    </Grid>
                    <Grid item>
                        <Link to={'/home'}>
                            <Button
                                label={'Login'}
                                variant={'contained'}
                                className={classes.button}
                            >
                                <Typography variant={'button'}>
                                    Login
                                </Typography>
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Login);
