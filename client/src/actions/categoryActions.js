import axios from 'axios';
import {
    CREATE_CAT,
    ASSIGN_CAT,
    UNASSIGN_CAT,
    DELETE_CAT,
    CAT_FAIL,
    FETCH_CAT,
    REGISTER_SUCCESS,
    UPDATE_SELECTED, UPDATE_RELATIONSHIPS
} from './types';

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

export const updateSelected = name => dispatch => {
    dispatch({
        type: UPDATE_SELECTED,
        payload: name,
    })
};

export const createCategory = ({name, color}) => async dispatch => {
    // already have category ? alert
    //else add
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    console.log('creating cat: ', name, color);
    const body = JSON.stringify({name: name, color: color});

    try {
        const res = await axios.post('http://localhost:5000/api/categories', body, config);

        dispatch({
            type: CREATE_CAT,
            payload: JSON.parse(res.data),
        });
    } catch (err) {
        dispatch({
            type: CAT_FAIL,
        });
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

export const assignCategory = (name, noteID) => async dispatch => {
    // already have category ? alert
    //else add
    console.log('here22: ', name, noteID);
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
    };

    const body = JSON.stringify({name: name});

    try {
        const res = await axios.post('http://localhost:5000/api/categories/'+noteID, body, config);
        console.log('here 25');

        dispatch({
            type: ASSIGN_CAT,
            payload: {catID: JSON.parse(res.data).category_id, noteID}
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
            payload: {catID: id, noteID}
        });
    } catch (err) {
        dispatch({
            type: CAT_FAIL,
        })
    }
};