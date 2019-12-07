import axios from 'axios';
import { FETCH_NOTES, NEW_NOTE, START_NOTE, EDIT_NOTE, SAVE_NOTE, DELETE_NOTE, OPEN_NOTE } from "./types";

const noteTemplate = {
    //id: null,
    owner: "test",
    parent_id: -1,
    title: 'test',
    goal_date: '1/1/2020',
    data: 'test-data'
};

export const fetchNotes = () => dispatch => {
    axios.get('localhost:5000/api/notes',{
        method: 'GET',
        headers: {
            'content-type': 'application/json'

        },
    })
        .then(res => res.json)
        .then(notes => dispatch({
            type: FETCH_NOTES,
            payload: notes
        }))
};

export const createNote = noteData => dispatch => {
    axios.post('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
            
        },
        body: JSON.stringify(noteData)
    })
        .then(res => res.json)
        .then(note => dispatch({
            type: NEW_NOTE,
            payload: note
        }))
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

export const saveNote = noteData => dispatch => {
    axios.put('http://localhost:5000/api/notes/'+noteData.id, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
            
        },
        body: JSON.stringify(noteData)
    })
        .then(res => res.json)
        .then(note => dispatch({
            type: SAVE_NOTE,
            payload: note
        }));
    dispatch(fetchNotes());
};

export const newNote = () => dispatch => {};
