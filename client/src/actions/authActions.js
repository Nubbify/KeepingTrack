import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from "./types";
import setAuthToken from "../utils/setAuthToken";
import setRefreshToken from "../utils/setRefreshToken";
import {fetchNotes} from "./noteActions";
import {fetchCategories} from "./categoryActions";

export const loadUser = () => async dispatch => {
    if (localStorage.access_token) {
        setAuthToken(localStorage.access_token);
    }

    // if (localStorage.refresh_token) {
    //     setRefreshToken(localStorage.refresh_token);
    // }

    try {
        const res = await axios.get('http://localhost:5000/api/auth/refresh');

        dispatch({
            type: USER_LOADED,
            user: res.data
        });
        dispatch(fetchNotes());
        dispatch(fetchCategories());
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
};


export const register = ({username, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username, email, password});
    console.log('body: ', body);

    try {
        const res = await axios.post('http://localhost:5000/api/auth/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
};

export const login = ({username, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({username, password});

    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
};