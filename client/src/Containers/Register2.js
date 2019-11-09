import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles, ThemeProvider} from '@material-ui/core/styles'
import {TextField, Typography, Button, createMuiTheme, CssBaseline} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

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

class Register2 extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const {values, handleChange} = this.props;
        const classes = this.props.classes;
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField1}
                            label={'First Name'}
                            variant={'outlined'}
                            floatingLabelText={'First Name'}
                            onChange={handleChange('firstName')}
                            defaultValue={values.firstName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField}
                            label={'Last Name'}
                            variant={'outlined'}
                            floatingLabelText={'Last Name'}
                            onChange={handleChange('lastName')}
                            defaultValue={values.lastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField}
                            label={'Enter Password'}
                            variant={'outlined'}
                            floatingLabelText={'Password'}
                            onChange={handleChange('pass')}
                            defaultValue={values.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField2}
                            label={'Confirm Password'}
                            variant={'outlined'}
                            floatingLabelText={'Confirm Password'}
                            onChange={handleChange('pass2')}
                            defaultValue={values.password2}
                        />
                    </Grid>
                    <Grid container direction={'row'} justify={'center'} alignItems={'center'} spacing={3}>
                        <Grid item>
                            <Button
                                label={'Continue'}
                                variant={'contained'}
                                onClick={this.continue}
                                className={classes.button}
                            >
                                <Typography variant={'button'}>
                                    Continue
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                label={'Back'}
                                variant={'contained'}
                                onClick={this.back}
                                className={classes.button}
                            >
                                <Typography variant={'button'}>
                                    Back
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Register2);
