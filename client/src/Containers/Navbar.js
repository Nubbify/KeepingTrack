import React, {Fragment, useState} from 'react';
import {AppBar, Toolbar, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from "../actions/authActions";
import Button from "@material-ui/core/Button";
import Login from "./Login";

const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
    const [open, setOpen] = useState(false);

    const authLinks = (
        ''
    );

    const guestLinks = (
        ''
    );

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log('here')
        setOpen(false);
    };

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Grid container direction={'row'} justify={'flex-end'} spacing={3}>
                    <Button onClick={handleOpen}>Login</Button>
                    <Login open={open} handleClose={handleClose}/>
                </Grid>
            </Toolbar>
        </AppBar>
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