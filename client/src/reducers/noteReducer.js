import { FETCH_NOTES, NEW_NOTE } from "../actions/types";

const initialState = {
    notes: [],
    note: {}
};

export default function(state = initialState, action){
    switch(action.type) {
        case FETCH_NOTES:
            return {
                ...state,
                notes: action.payload,
            };
        case NEW_NOTE:
            return{
                ...state,
                note: action.payload,
            }
        default:
            return state;
    }
};