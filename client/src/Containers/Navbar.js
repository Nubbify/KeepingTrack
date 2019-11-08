import React, {Component} from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import {styled} from "@material-ui/core/styles";
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {};
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {

    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        Welcome
                    </Typography>
                    <Button color="inherit" onClick={event => this.handleLogin(event)}>Login</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;