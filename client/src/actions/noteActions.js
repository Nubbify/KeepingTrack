import { FETCH_NOTES, NEW_NOTE } from "./types";

export const fetchNotes = () => dispatch => {
    axios.post('localhost:5000/notes')
        .then(res => res.json())
        .then(notes => dispatch({
            type: FETCH_NOTES,
            payload: notes
        }))
};

export const createNote = noteData => dispatch => {
    axios.post('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(noteData)
    })
        .then(res => res.json())
        .then(note => dispatch({
            type: NEW_NOTE,
            payload: note
        }))
};

export const newNote = () => dispatch => {};
