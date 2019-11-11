import React, {Component} from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button, styled} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import Grid from "@material-ui/core/Grid";

class Navbar extends Component {
    constructor() {
        super();
        this.state = {};
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {

    }

    render() {
        const Login = styled(Button)({
            flexGrow: 1
        });
        return (
            <AppBar position="static">
                <Toolbar variant="dense">
                    {(this.props.from == 'welcome' || this.props.from == 'success') ?
                        <Grid container direction="row" justify={'flex-end'} alignItems="center">
                            <Grid item>
                                <Link to={'/login'}>
                                    <Login color={'secondary'} variant={'contained'}>
                                        <Typography variant={'button'}>
                                            Login
                                        </Typography>
                                    </Login>
                                </Link>
                            </Grid>
                        </Grid>
                        :
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar;