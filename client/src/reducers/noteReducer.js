import { FETCH_NOTES, NEW_NOTE, START_NOTE, EDIT_NOTE, SAVE_NOTE, DELETE_NOTE, OPEN_NOTE } from "../actions/types";

const initialState = {
    notes: [],
    note: null
};

export default function(state = initialState, action){
    switch(action.type) {
        case FETCH_NOTES:
        case SAVE_NOTE:
            return {
                ...state,
                notes: action.payload,
            };
        case NEW_NOTE:
        case START_NOTE:
        case EDIT_NOTE:
            return{
                ...state,
                note: action.payload,
            };
        case OPEN_NOTE:
            return{
                ...state,
                note: state.notes.filter(note => note.id === action.payload)
            };
        default:
            return state;
    }
};