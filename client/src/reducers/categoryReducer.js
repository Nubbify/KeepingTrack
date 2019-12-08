import {CREATE_CAT, ASSIGN_CAT, DELETE_CAT, UNASSIGN_CAT, CAT_FAIL} from "../actions/types";

const initialState = {
    categories: [{id: 0, label: 'Recipes', color: '#ffffff'}],
    relationships: {},
};

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case CREATE_CAT:
            return{
                ...state,
                categories: state.categories.append(payload)
            };
        case ASSIGN_CAT:
            const updatedTree = state.relationships;
            updatedTree[payload.label] = updatedTree[payload.label] ? updatedTree[payload.label].append(payload.noteID)
                : [payload.noteID];
            return{
                ...state,
                relationships: updatedTree,
            };
        case UNASSIGN_CAT:
            const updatedTree2 = state.relationships;
            if (updatedTree2[payload.label])
            updatedTree2[payload.label] = updatedTree2[payload.label].filter(noteID => noteID !== payload.noteID);
            return{
                ...state,
                relationships: updatedTree2,
            };
        case DELETE_CAT:
            const updateDelete = state.relationships;
            delete updateDelete[payload.label];
            return{
                ...state,
                relationships: updateDelete,
            };
        default:
            return state;
    }
};