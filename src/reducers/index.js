import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from 'redux-firestore'
import taskReducer from './taskReducer'
import authReducer from "./authReducer";
import toggleMenu from "./toggleMenu";

export default combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    task: taskReducer,
    auth:authReducer,
    toggle:toggleMenu
})