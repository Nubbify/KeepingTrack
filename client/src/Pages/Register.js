import React, {Fragment, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Register1 from "../Containers/Register1";
import Register2 from "../Containers/Register2";
import axios from 'axios';
import {ThemeProvider} from '@material-ui/core/styles'
import {connect} from 'react-redux';
import {register} from "../actions/authActions";
import PropTypes from 'prop-types';
import {createMuiTheme, CssBaseline} from "@material-ui/core";

const Register = ({register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        step: 1,
        email: '',
        userName: '',
        password: '',
        password2: '',
    });

    const {step, email, userName, password, password2} = formData;


    const nextStep = () => {
        setFormData({...formData, step: step + 1})
    };

    const prevStep = () => {
        setFormData({...formData, step: step - 1})
    };

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        if (password !== password2) {
            console.log('Passwords don\'t match');
        } else {
            const newUser = {
                userName,
                email,
                password
            };

            register(newUser);
        }
    };

    if (isAuthenticated) {
        return <Redirect to={'/home'}/>
    }

    const theme = createMuiTheme({
        palette: {
            type: 'dark',
        }
    });

    const values = {userName, email, password, password2};
    switch (step) {
        case 1:
            return (
                <Register1
                    nextStep={nextStep}
                    handleChange={handleChange}
                    values={values}
                />
            );
        case 2:
            return (
                <Register2
                    nextStep={nextStep}
                    prevStep={prevStep}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    values={values}
                />
            );
    }
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {register})(Register);