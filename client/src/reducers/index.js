import { combineReducers } from "redux";
import noteReducer from './noteReducer';
import authReducer from "./authReducer";
import menuReducer from "./menuReducer";
import profileReducer from "./profileReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
    notes: noteReducer,
    auth: authReducer,
    cat: categoryReducer,
    menu: menuReducer,
    profile: profileReducer,
})