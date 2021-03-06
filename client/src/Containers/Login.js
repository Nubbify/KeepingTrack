import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {login} from "../actions/authActions";
import {TextField, Typography, Button, Link, Grid, Modal, makeStyles, Paper} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        float: 'left',
        left: '50%',
        top: '30%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: 200,
    },

}));

const Login = ({login, isAuthenticated, open, handleClose}) => {
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
        e.preventDefault();
        login({username: userName, password});
    };

    const handleClickShowPassword = () => {
        setFormData({ ...formData, showPassword: !formData.showPassword });
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };


    if(isAuthenticated){
        return <Redirect to={'/home'}/>;
    };

    return (
        <Modal
            aria-labelledby={'login-modal'}
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
        >
            <Paper className={classes.paper}>
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
                        <Link to={'/home'} style={{'textDecoration': 'none'}}>
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
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {login})(Login);
