import { combineReducers } from "redux";
import noteReducer from './noteReducer';
import authReducer from "./authReducer";
import menuReducer from "./menuReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
    notes: noteReducer,
    auth: authReducer,
    menu: menuReducer,
    profile: profileReducer,
})