import axios from 'axios';
import {CLOSE_NOTE, DELETE_NOTE, FETCH_NOTES, NOTE_FAIL, OPEN_NOTE, SAVE_NOTE,} from "./types";
import {assignCategory, createCategory, unassignCategory} from "./categoryActions";

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

export const saveNote = ({id, owner, parent_id, title, goal_date, data}, editorCategories, currentCategories) => async dispatch => {
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
    console.log('here11');

    if (editorCategories && editorCategories.length > 0) {
        console.log('here12');
        editorCategories.forEach(cat => {
            console.log('catID: ', cat.id);
            console.log('catID: ', cat.id===null);
            console.log('catID: ', cat.id===null);
            if (cat.id === undefined) {
                console.log('here13: ', cat.id);
                console.log('here13: ', cat.id !== null);
                dispatch(createCategory(cat))
            }
            console.log('here14');
            if (!currentCategories || currentCategories.length === 0 || currentCategories.filter(elem => elem.name === cat.name).length === 0) {
                // new category added to note
                console.log('here15');
                dispatch(assignCategory(cat.name, id));
            }
        })
    }

    if (currentCategories && currentCategories.length > 0) {
        currentCategories.forEach(cat => {
            if (!editorCategories || editorCategories.length === 0 || editorCategories.filter(elem => elem.name === cat.name).length === 0) {
                // category removed from note
                dispatch(unassignCategory(cat, id));
            }
        })
    }
};

export const deleteNote = (noteID) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.delete('http://localhost:5000/api/notes/' + noteID, config);

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