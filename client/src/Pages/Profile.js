import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';

class Profile extends Component{
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>
                Profile!
            </div>
        )
    }
}

export default Profile;