import React, {Fragment} from 'react';
import {TextField, Typography, Button, CssBaseline, Toolbar} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {createMuiTheme, ThemeProvider, makeStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar/AppBar";

const useStyles = makeStyles({
    paper: {
        marginTop: '100px',
        borderRadius: '30px'
    },
    formWrapper:{
        padding: '60px 60px 60px 60px',
    },
    mainText: {
        textAlign: 'center'
    },
    appBar: {
        borderRadius: '30px 30px 0 0',
        position: 'relative',
        boxShadow: 'none',
        minHeight: '80px'
    },
    toolbar: {
        background: 'primary',
        minHeight: '150px'
    },
    divider: {
        marginBottom: '20px',
        marginTop: '5px'
    },
    startButton: {
        marginTop: '15px',
    }
});

const Register1 = ({nextStep, handleChange, values}) => {
    const classes = useStyles();
    return (
            <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3}>
                <Paper className={classes.paper}>
                    <AppBar color="primary" className={classes.appBar}>
                        <Toolbar className={classes.toolBar} />
                    </AppBar>
                    <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3} className={classes.formWrapper}>
                        <Grid item xs={12}>
                            <Typography variant={'h2'} className={classes.mainText}>
                                Get Organized
                            </Typography>
                            <Divider className={classes.divider}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label={'Enter email here'}
                                name={'email'}
                                onChange={handleChange}
                                defaultValue={values.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                label={'Start'}
                                variant={'contained'}
                                onClick={nextStep}
                                color={'secondary'}
                                className={classes.startButton}
                            >
                                <Typography variant={'button'}>
                                    Start
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
    );
};

export default Register1;
