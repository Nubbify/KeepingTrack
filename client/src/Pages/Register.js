import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Link, Route} from 'react-router-dom';
import {Paper, Typography} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {styled, ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import Register1 from "../Containers/Register1";
import Register2 from "../Containers/Register2";
import Confirm from "../Containers/Confirm";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            step: 1,
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            password2: '',
        };

        this.nextStep = this.nextStep.bind(this);
        this.prevStep = this.nextStep.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    };

    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    };

    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    render() {
        const {theme} = this.props;
        const {step} = this.state;
        const {firstName, lastName, email} = this.state;
        const values = {firstName, lastName, email};
        switch (step) {
            case 1:
                return (
                    <Register1
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                        theme = {theme}
                    />
                );
            case 2:
                return (
                    <Register2
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                        theme = {theme}
                    />
                );
            case 3:
                return (
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                        theme = {theme}
                    />
                );
        }
    }
}

export default Register;