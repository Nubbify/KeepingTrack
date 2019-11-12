import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {TextField, Typography, Button, CssBaseline, createMuiTheme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";

const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#ffcc80',
            },
            secondary: {
                main: '#b2dfdb',
            },
            background: {
                default: '#ffcc80'
            }
        },
        themeName: 'register2'
    }
);

const useStyles = makeStyles({
    formWrapper: {
        marginTop: '200px',
        padding: '25px 25px 45px 25px',
        justifyContent: 'center',
        borderRadius: '20px'
    },
    buttonGroup: {
        marginTop: '5px'
    },
});

const Register2 = ({nextStep, prevStep, handleSubmit, values, handleChange}) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3}>
                <Paper className={classes.formWrapper}>
                    <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label={'User Name'}
                                name={'userName'}
                                variant={'outlined'}
                                onChange={handleChange}
                                defaultValue={values.userName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={'Enter Password'}
                                variant={'outlined'}
                                name={'password'}
                                onChange={handleChange}
                                defaultValue={values.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={'Confirm Password'}
                                name={'password2'}
                                variant={'outlined'}
                                onChange={handleChange}
                                defaultValue={values.password2}
                            />
                        </Grid>
                        <Grid container direction={'row'} justify={'center'} alignItems={'center'} spacing={3}
                              className={classes.buttonGroup}>
                            <Grid item>
                                <Button
                                    label={'Continue'}
                                    variant={'contained'}
                                    onClick={handleSubmit}
                                    color={'secondary'}
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
                                    onClick={prevStep}
                                >
                                    <Typography variant={'button'}>
                                        Back
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </ThemeProvider>
    );
};

export default Register2;
