import axios from 'axios';
import {CLOSE_NOTE, DELETE_NOTE, FETCH_NOTES, NOTE_FAIL, OPEN_NOTE, SAVE_NOTE,} from "./types";

export const fetchNotes = () => async dispatch => {
    const config = {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    };

    try {
        const res = await axios.get('http://localhost:5000/api/notes', config);

        dispatch({
            type: FETCH_NOTES,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: NOTE_FAIL
        });
    }
};

export const openNote = noteID => dispatch => {
    dispatch({
        type: OPEN_NOTE,
        payload: noteID
    })
};

export const saveNote = ({id, owner, parent_id, title, goal_date, data}) => async dispatch => {
    dispatch({
        type: CLOSE_NOTE
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (id) {
        const body = JSON.stringify({title, data});

        try {
            const res = await axios.put('http://localhost:5000/api/notes/' + id, body, config);

            dispatch({
                type: SAVE_NOTE,
                payload: res.data
            });

            dispatch(fetchNotes());

        } catch (err) {
            dispatch({
                type: NOTE_FAIL
            })
        }
    } else {
        const body = JSON.stringify({title, goal_date, data});

        try {
            const res = await axios.post('http://localhost:5000/api/notes', body, config);

            dispatch({
                type: CLOSE_NOTE,
                payload: res.data
            });

            dispatch(fetchNotes());
        } catch (err) {
            dispatch({
                type: NOTE_FAIL
            })
        }

    }
};

export const deleteNote = (noteID) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.delete('http://localhost:5000/api/notes/'+noteID, config);

        dispatch({
            type: DELETE_NOTE,
            payload: res.data,
        });

        dispatch(fetchNotes());

    } catch (err) {
        dispatch({
            type: NOTE_FAIL
        })
    }

};