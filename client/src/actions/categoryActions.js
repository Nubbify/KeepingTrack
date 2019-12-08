import axios from 'axios';
import {CREATE_CAT, ASSIGN_CAT, UNASSIGN_CAT, DELETE_CAT, CAT_FAIL} from './types';

export const createCategory = ({label, color}) => async dispatch => {
    // already have category ? alert
    //else add
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const body = JSON.stringify({label: label, color: color});

    try {
        const res = await axios.post('http://localhost:5000/api/category', body, config);

        dispatch({
            type: CREATE_CAT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: CAT_FAIL,
        })
    }
};

export const deleteCategory = catID => async dispatch => {
    // already have category ? alert
    //else add
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const body = JSON.stringify({label: label});

    try {
        const res = await axios.delete('http://localhost:5000/api/category/'+catID, config);

        dispatch({
            type: DELETE_CAT,
        });
    } catch (err) {
        dispatch({
            type: CAT_FAIL,
        })
    }
};

export const assignCategory = ({catID, noteID}) => async dispatch => {
    // already have category ? alert
    //else add
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const body = JSON.stringify({category: catID, noteID: noteID});

    try {
        const res = await axios.post('http://localhost:5000/api/category', body, config);

        dispatch({
            type: ASSIGN_CAT,
            payload: {catID, noteID}
        });
    } catch (err) {
        dispatch({
            type: CAT_FAIL,
        })
    }
};

export const unassignCategory = ({label, noteID}) => async dispatch => {
    // already have category ? alert
    //else add
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const body = JSON.stringify({label: label, noteID: noteID});

    try {
        const res = await axios.post('http://localhost:5000/api/category', body, config);

        dispatch({
            type: UNASSIGN_CAT,
            payload: {label, noteID}
        });
    } catch (err) {
        dispatch({
            type: CAT_FAIL,
        })
    }
};