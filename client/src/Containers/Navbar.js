import React, {Fragment, useState} from 'react';
import {AppBar, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from "../actions/authActions";
import Button from "@material-ui/core/Button";
import Login from "./Login";
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
}));

const Navbar = ({auth: {isAuthenticated, loading}, logout, openD, handleDrawerOpen}) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const authLinks = (
        <Fragment>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: openD,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, openD && classes.hide)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Button onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Grid container direction={'row'} justify={'flex-end'} spacing={3}>
                        <Button onClick={handleOpen}>Login</Button>
                        <Login open={open} handleClose={handleClose}/>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Fragment>
    );

    return (
        <Fragment>{!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}</Fragment>
    )
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);