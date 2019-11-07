import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Containers/Navbar';
import './App.css';
import Welcome from './Pages/Welcome';
import Home from './Pages/Home';
import Calendar from './Pages/Calendar';
import Profile from './Pages/Profile';

class App extends Component{
  constructor() {
    super();
    this.state = {
    };
  }

  render(){
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route path={'/'} component={Welcome}/>
                <Route path={'/home'} component={Home}/>
                <Route path={'/cal'} component={Calendar}/>
                <Route path={'/profile'} component={Profile}/>
            </Switch>
        </Router>
    )
  }
}
export default App;
