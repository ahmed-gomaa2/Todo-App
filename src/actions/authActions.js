import {createDispatchHook} from "react-redux";

export const signIn = (email, password) => (dispatch, getState, {getFirebase} ) => {
    const firebase = getFirebase()

    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        dispatch({
            type:'SIGN_IN'
        })
    }).catch(err => {
        dispatch({
            type: 'SIGN_IN_ERR',
            payload: err
        })
    })
}

export const signOut = () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    firebase.auth().signOut().then(()=> {
        dispatch({type:'SIGN_OUT'})
    })
}

export const signUp = (email, password) => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        dispatch({type:'SIGN_UP'})
    }).catch(err => {
        dispatch({type: 'SIGN_UP_ERR',payload: err})
    })
}