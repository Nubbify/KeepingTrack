import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';

class Home extends Component{
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                Home!
            </div>
        )
    }
}

export default Home;