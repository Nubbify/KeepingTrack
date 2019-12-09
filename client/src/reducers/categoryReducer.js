import {
    ASSIGN_CAT,
    CLOSE_NOTE,
    CREATE_CAT,
    DELETE_CAT,
    FETCH_CAT, FILTER,
    OPEN_NOTE,
    UNASSIGN_CAT,
    UPDATE_SELECTED, UPDATED_FILTERED
} from "../actions/types";
import {filterCatsH} from "../actions/categoryActions";

const initialState = {
    categories: [],
    currentCategories: [],
    editorCategories: [],
    catToNotes: {},
    noteToCats: {},
    filterCats: [],
    filtered: false,
};

export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case FETCH_CAT:
            return {
                ...state,
                categories: payload,
            };
        case UPDATE_SELECTED:
            const substitutedNewCategories = payload.map(cat => typeof (cat) === typeof ('awef') ? {
                name: cat,
                color: '#' + Math.floor(Math.random() * 16777215).toString(16)
            } : cat);

            return {
                ...state,
                editorCategories: substitutedNewCategories
            };
        case FILTER:
            const {catID, mode} = payload;
            const filterUpdate = state.filterCats;
            if (mode === 1){
                filterUpdate.push(catID);
            }else{
                filterUpdate.splice(filterUpdate.indexOf(catID), 1);
            }
            return {
                ...state,
                filterCats: filterUpdate,
            };
        case UPDATED_FILTERED:
            return {
                ...state,
                filtered: (state.filterCats && state.filterCats.length > 0),
            };
        case OPEN_NOTE:
            const extractedCur = state.noteToCats[payload];
            if (extractedCur && extractedCur.length > 0) {
                console.log(extractedCur);
                const extractedCurCategories = extractedCur.map(catID => state.categories.filter(element => element.id === catID)[0]);
                console.log('awefawe: ', extractedCurCategories);
                return {
                    ...state,
                    currentCategories: extractedCurCategories,
                    editorCategories: extractedCurCategories,
                };
            } else {
                return {
                    ...state,
                    currentCategories: [],
                    editorCategories: [],
                };
            }
        case CLOSE_NOTE:
            return {
                ...state,
                currentCategories: [],
                editorCategories: [],
            };
        case CREATE_CAT:
            const newCategories = state.categories;
            newCategories.push(payload);
            return {
                ...state,
                categories: newCategories,
            };
        case ASSIGN_CAT:
            console.log('herea');
            const updatedN2C = state.noteToCats;
            console.log('hereaplni: ', payload.noteID);
            console.log('hereaplci: ', payload.catID);
            if (updatedN2C[payload.noteID]) {
                updatedN2C[payload.noteID].push(payload.catID);
            } else {
                updatedN2C[payload.noteID] = [payload.catID];
            }
            console.log('hereaun2c : ', updatedN2C);
            const updatedC2N = state.catToNotes;
            if (updatedC2N[payload.catID]) {
                updatedC2N[payload.catID].push(payload.noteID);
            } else {
                updatedC2N[payload.catID] = [payload.noteID];
            }
            console.log('hereauc2n : ', updatedC2N);
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
            };
        case DELETE_CAT:
            console.log('here2');
            const updateCat = state.categories ? state.categories.filter(cat => cat.id !== payload) : [];
            console.log('here3');
            const updateCur = state.currentCategories ? state.currentCategories.filter(cat => cat.id !== payload) : [];
            console.log('here4');
            const updateC2N = state.catToNotes;
            console.log('here5');
            delete updateC2N[payload];
            console.log('here6');
            if(state.noteToCats && Object.keys(state.noteToCats).length > 0){
                console.log(state.categories);
                console.log(Object.keys(state.noteToCats));
                console.log(Object.keys(state.noteToCats).length);
                const updateN2C = state.categories.map(catList => catList.splice(catList.indexOf(payload), 1));
                console.log('here7');
                return {
                    ...state,
                    categories: updateCat,
                    currentCategories: updateCur,
                    catToNotes: updateC2N,
                    noteToCats: updateN2C,
                };
            }else{
                console.log('here7');
                return {
                    ...state,
                    categories: updateCat,
                    currentCategories: updateCur,
                    catToNotes: updateC2N,
                };
            }
        default:
            return state;
    }
};