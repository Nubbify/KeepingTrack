import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';
import Calendar from './Pages/Calendar';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/core/styles'
import LoginPage from "./Pages/LoginPage";
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./Components/Routing/PrivateRoute";

const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#ffcc80',
            },
            secondary: {
                main: '#b2dfdb',
            },
            background: {
                main: '#ffffff'
            }
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
                        <Route path={'/login'}> <LoginPage theme={theme}/> </Route>
                        <PrivateRoute path={'/home'} component={Home} theme={theme}/>
                        {/*<PrivateRoute path={'/home'} component={Calendar} theme={theme}/>*/}
                        {/*<PrivateRoute path={'/home'} component={Profile} theme={theme}/>*/}
                    </Switch>
                </Router>
            </Provider>
        </ThemeProvider>
    );
};


export default App;
