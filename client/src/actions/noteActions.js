import axios from 'axios';
import {
    FETCH_NOTES,
    NEW_NOTE,
    START_NOTE,
    EDIT_NOTE,
    SAVE_NOTE,
    NOTE_FAIL,
    DELETE_NOTE,
    OPEN_NOTE,
} from "./types";
import {loadUser} from "./authActions";

const noteTemplate = {
    id: null,
    owner: null,
    parent_id: null,
    title: '',
    goal_date: '',
    data: ''
};

export const fetchNotes = () => dispatch => {
    axios.get('localhost:5000/api/notes',{
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(notes => dispatch({
            type: FETCH_NOTES,
            payload: notes
        }))
};

export const createNote = ({id, owner, parent_id, title, goal_date, data}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(
        'title:', title,
        ' goal_date:', goal_date,
        ' data:', data,
        )

    const body = JSON.stringify({title, goal_date, data});

    try {
        const res = await axios.post('http://localhost:5000/api/notes', body, config);

        dispatch({
            type: NEW_NOTE,
            payload: res.data
        });

        dispatch(fetchNotes());
    } catch (err) {
        dispatch({
            type: NOTE_FAIL
        })
    }
};

export const startNote = () => dispatch => {
    dispatch({
        type: START_NOTE,
        payload: noteTemplate
    })
};

export const openNote = noteID => dispatch => {
    dispatch({
        type: OPEN_NOTE,
        payload: noteID
    })
}

export const editNote = noteData => dispatch => {
    dispatch({
        type: EDIT_NOTE,
        payload: noteData
    })
};

export const saveNote = ({id, owner, parent_id, title, goal_date, data}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({title, data});

    try {
        const res = await axios.put('http://localhost:5000/api/notes'+id, body, config);

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
};

export const newNote = () => dispatch => {};
