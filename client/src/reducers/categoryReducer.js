import {
    ASSIGN_CAT,
    CREATE_CAT,
    DELETE_CAT, OPEN_NOTE,
    UNASSIGN_CAT,
    UPDATE_RELATIONSHIPS,
    UPDATE_SELECTED
} from "../actions/types";
import {createCategory} from "../actions/categoryActions";

const initialState = {
    categories: [{id: 0, name: 'Recipes', color: '#ffffff'}],
    currentCategories: [],
    editorCategories: [],
    catToNotes: {},
    noteToCats: {},
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_SELECTED:
            const substitutedNewCategories = payload.map(cat => typeof (cat) === typeof ('awef') ? {
                name: cat,
                color: '#' + Math.floor(Math.random() * 16777215).toString(16)
            } : cat);

            return {
                ...state,
                editorCategories: substitutedNewCategories
            };
        case OPEN_NOTE:
            const noteId = payload;
            return {
                ...state,
                currentCategories: state.noteToCats[noteId],
                editorCategories: state.noteToCats[noteId],
            };
        case CREATE_CAT:
            const newCategories = state.categories;
            newCategories.push(payload);
            return {
                ...state,
                categories: newCategories,
            };
        case ASSIGN_CAT:
            console.log('here');
            const updatedN2C = state.noteToCats;
            updatedN2C[payload.noteID].push(payload.catID)
            const updatedC2N = state.catToNotes;
            updatedC2N[payload.catID].push(payload.noteID)
            return {
                ...state,
                noteToCats: updatedN2C,
                catToNotes: updatedC2N
            };
        case UNASSIGN_CAT:
            console.log('here');
            const updatedN2C2 = state.noteToCats;
            delete updatedN2C2[payload.noteID][payload.catID];
            const updatedC2N2 = state.catToNotes;
            delete updatedC2N2[payload.catID][payload.noteID];
            return {
                ...state,
                noteToCats: updatedN2C2,
                catToNotes: updatedC2N2
            };        case DELETE_CAT:
            const updateDelete = state.relationships;
            delete updateDelete[payload.label];
            return {
                ...state,
                relationships: updateDelete,
            };
        default:
            return state;
    }
};