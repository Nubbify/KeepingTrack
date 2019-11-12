import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {login} from "../actions/authActions";
import {TextField, Typography, Button, Link, Grid, Modal, makeStyles, Paper} from "@material-ui/core";

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
}));

const Login = ({login, isAuthenticated, open, handleClose}) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });

    const {userName, password} = formData;

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async e => {
        e.preventDefault();
        login(userName, password);
    };

    if (isAuthenticated) {
        handleClose();
        return <Redirect to={'/home'}/>
    }

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
                            onChange={e => handleChange(e)}
                            defaultValue={userName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label={'Password'}
                            name={'password'}
                            variant={'outlined'}
                            onChange={e => handleChange(e)}
                            defaultValue={password}
                        />
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
    isAuthenticated: state.isAuthenticated
});


export default connect(mapStateToProps, {login})(Login);
