import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, TextField, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import {connect} from "react-redux";
import {login} from "../actions/authActions";
import {Redirect} from "react-router";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";

const useStyles = makeStyles({
    formWrapper: {
        marginTop: '200px',
        padding: '25px 25px 45px 25px',
        justifyContent: 'center',
        borderRadius: '20px'
    },
    buttonGroup: {
        marginTop: '5px'
    },
});

const LoginPage = ({login, isAuthenticated}) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        showPassword: false,
    });

    const {userName, password} = formData;


    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        const user = {
            username: userName,
            password
        };
        login(user);
    };

    const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };


    if (isAuthenticated) {
        return <Redirect to={'/home'}/>
    }

    return (
        <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3}>
            <Paper className={classes.formWrapper}>
                <Grid container direction={'column'} justify={'center'} alignItems={'center'} spacing={3}
                      id={'login-modal'}>
                    <Grid item xs={12}>
                        <TextField
                            label={'User Name'}
                            name={'userName'}
                            variant={'outlined'}
                            onChange={handleChange}
                            defaultValue={userName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={formData.showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                name={'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button
                            label={'Login'}
                            variant={'contained'}
                            onClick={handleSubmit}
                            color={'secondary'}
                        >
                            <Typography variant={'button'}>
                                Login
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {login})(LoginPage);