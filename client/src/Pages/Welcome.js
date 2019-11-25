import React, {Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {Link, Redirect} from "react-router-dom";
import Navbar from "../Containers/Navbar";
import Fab from "@material-ui/core/Fab";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    title: {
        padding: theme.spacing(2, 2, 0),
        alignContent: 'center'
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    regButton: {
        zIndex: 1,
        top: -65,
        boxShadow: '0px 0px 0px 15px rgba(250,250,250,1)'
    },
    link: {
        textDecoration: 'none',
    },
    toolBar: {
        minHeight: 128
    }
}));

const Welcome = ({isAuthenticated}) => {
    const classes = useStyles();

    if (isAuthenticated) {
        return <Redirect to={'/home'}/>
    }

    return (
        <Fragment>
            <Navbar from='welcome'/>
            <Grid container direction={'column'} justify={'center'} alignItems={'center'}>
                <Typography variant="h1" className={classes.title}>
                    Welcome!
                </Typography>
            </Grid>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <Grid container direction={'row'} justify={'center'} alignItems={'center'}>
                        <Link to={'/register'} className={classes.link}>
                            <Fab color="secondary" variant={'extended'} aria-label="register"
                                 className={classes.regButton}>
                                <Typography variant={'h5'}>
                                    REGISTER
                                </Typography>
                            </Fab>
                        </Link>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
};

Welcome.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {})(Welcome);