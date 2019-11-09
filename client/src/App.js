import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Containers/Navbar';
import './App.css';
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';
import Calendar from './Pages/Calendar';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles'
import Login from "./Containers/Login";


class App extends Component {
    constructor() {
        super();
        this.state = {};
        this.changePage = this.changePage.bind(this);
    }

    changePage(page, user) {

    }

    render() {
        const theme = createMuiTheme({
            palette: {
                type: 'dark',
                background: {default: '#1C313A'}
            }
        });
        return (
            <Router>
                <Switch>
                    <Route exact path={'/'}> <Welcome theme={theme}/> </Route>
                    <Route path={'/register'}> <Register theme={theme}/> </Route>
                    <Route path={'/login'}> <Login theme={theme}/> </Route>
                    <Route path={'/home'}> <Home theme={theme}/> </Route>
                    <Route path={'/cal'}> <Calendar theme={theme}/> </Route>
                    <Route path={'/profile'}> <Profile theme={theme}/> </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
