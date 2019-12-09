import axios from 'axios';
import {CREATE_CAT, ASSIGN_CAT, UNASSIGN_CAT, DELETE_CAT, CAT_FAIL, FETCH_CAT} from './types';

export const fetchCategories = () => async dispatch => {
    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    };

    try {
        const res = await axios.get('http://localhost:5000/api/categories', config);

        dispatch({
            type: FETCH_CAT,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: CAT_FAIL
        })
    }
};

export const createCategory = ({name, color}) => async dispatch => {
    // already have category ? alert
    //else add
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const body = JSON.stringify({name: name, color: color});

    try {
        const res = await axios.post('http://localhost:5000/api/category', body, config);

        dispatch({
            type: CREATE_CAT,
            payload: res.data
        });
        // TEMP _ REPLACE
        return {id: 0, name: name, color: color};
        // return res.data;
    } catch (err) {
        dispatch({
            type: CAT_FAIL,
        });
        return {id: 0, name: name, color: color};
    }
};

export const deleteCategory = ({id, name, color}) => async dispatch => {
    // already have category ? alert
    //else add
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    try {
        const res = await axios.delete('http://localhost:5000/api/categories/'+name, config);

        dispatch({
            type: DELETE_CAT,
            payload: name,
        });
    } catch (err) {
        dispatch({
            type: CAT_FAIL,
        })
    }
};

export const assignCategory = ({id, name, color}, noteID) => async dispatch => {
    // already have category ? alert
    //else add
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const body = JSON.stringify({name: name});

    try {
        const res = await axios.post('http://localhost:5000/api/categories/'+noteID, body, config);

        dispatch({
            type: ASSIGN_CAT,
            payload: {name, noteID}
        });
    } catch (err) {
        dispatch({
            type: CAT_FAIL,
        })
    }
};

export const unassignCategory = ({id, name, color}, noteID) => async dispatch => {
    // already have category ? alert
    //else add
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const body = JSON.stringify({name: name});

    try {
        const res = await axios.post('http://localhost:5000/api/categories/'+noteID, body, config);

        dispatch({
            type: UNASSIGN_CAT,
            payload: {name, noteID}
        });
    } catch (err) {
        dispatch({
            type: CAT_FAIL,
        })
    }
};