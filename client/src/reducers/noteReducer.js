import { FETCH_NOTES, CLOSE_NOTE, SAVE_NOTE, DELETE_NOTE, OPEN_NOTE } from "../actions/types";


const initialState = {
    open: false,
    note: null,
    notes: []
};

export default function(state = initialState, action){
    switch(action.type) {
        case FETCH_NOTES:
            return {
                ...state,
                notes: JSON.parse(action.payload),
            };
        case OPEN_NOTE:
            if (action.payload === null) {
                const date = new Date();
                const mm = date.getMonth()+1;
                const dd = date.getDate();
                const yyyy = date.getFullYear();
                const goalDate = mm + '/' + dd + '/' + yyyy;
                return{
                    ...state,
                    open: true,
                    note: {
                        id: null,
                        owner: '',
                        parent_id: -1,
                        title: '',
                        goal_date: goalDate,
                        data: ''
                    }
                }
            }else{
                return{
                    ...state,
                    open: true,
                    note: state.notes.filter(note => note.id === action.payload)[0],
                };
            }
        case CLOSE_NOTE:
            return{
                ...state,
                open: false,
                note: null,
            };
        default:
            return state;
    }
};