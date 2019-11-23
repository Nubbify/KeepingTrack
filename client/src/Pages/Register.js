import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Register1 from "../Containers/Register1";
import Register2 from "../Containers/Register2";
import {connect} from 'react-redux';
import {register} from "../actions/authActions";
import PropTypes from 'prop-types';
import {createMuiTheme} from "@material-ui/core";

const Register = ({register, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        step: 1,
        email: '',
        userName: '',
        password: '',
        password2: '',
        showPassword: false,
        showPassword2: false,
    });

    const {step, email, userName, password, password2, showPassword, showPassword2} = formData;


    const nextStep = () => {
        setFormData({...formData, step: step + 1})
    };

    const prevStep = () => {
        setFormData({...formData, step: step - 1})
    };

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleClickShowPassword2 = () => {
        setFormData({ ...formData, showPassword2: !formData.showPassword2 });
    };

    const handleMouseDownPassword2 = event => {
        event.preventDefault();
    };

    const handleSubmit = async e => {
        if (password !== password2) {
            console.log('Passwords don\'t match');
        } else {
            const newUser = {
                username: userName,
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

    const values = {userName, email, password, password2, showPassword, showPassword2};
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
                    handleClickShowPassword={handleClickShowPassword}
                    handleMouseDownPassword={handleMouseDownPassword}
                    handleClickShowPassword2={handleClickShowPassword2}
                    handleMouseDownPassword2={handleMouseDownPassword2}
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