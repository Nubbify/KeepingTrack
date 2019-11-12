import React, {Component, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';
import Calendar from './Pages/Calendar';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles'
import Login from "./Containers/Login";
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#ffcc80',
            },
            secondary: {
                main: '#b2dfdb',
            },
        },
    }
);

if (localStorage.access_token) {
    setAuthToken(localStorage.access_token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser())
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
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
            </Provider>
        </ThemeProvider>
    );
};


export default App;
