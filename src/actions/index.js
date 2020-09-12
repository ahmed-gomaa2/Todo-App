import {getFirebase} from "react-redux-firebase";

export const addTask = (task, collection, date, userId) => (dispatch, getState, {getFirebase})=> {
    const firestore = getFirebase().firestore()
    firestore.collection(collection).add({
        task: task,
        date:date,
        overdue: false,
        userID: userId,
        overdueDate: date
    }).then(()=> {
        dispatch({
            type: 'ADD_TASK',
            task
        })
    }).catch(err => {
        dispatch({
            type: 'ADD_TASK_ERR',
            err
        })
    })
}

export const deleteTodo = (task, collection) => (dispatch, getState, {getFirebase})=> {
    const firestore = getFirebase().firestore()
    firestore.collection(collection).doc(task.id).delete().then(()=> {
        dispatch({
            type: 'ADD_TASK',
            task
        })
    }).catch(err => {
        dispatch({
            type: 'ADD_TASK_ERR',
            err
        })
    })
}


export const editTask = (task, todo,  collection) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()
    firestore.collection(collection).doc(todo.id).set({
        task: task,
        date: todo.date,
        overdue: todo.overdue,
    })
}

export const overdueTask = (task, collection) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()
    firestore.collection(collection).doc(task.id).set({
        ...task,
        overdue:true
    })
}

export const completeTask = (task, collection) => (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore()
    firestore.collection('done').add({
        ...task
    }).then(() => firestore.collection(collection).doc(task.id).delete())

}

export const moveTomorrowTasks = (task) => (dispatch, getState, {getFirebase}) => {
    const day = task.overdueDate.toDate();
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    console.log(nextDay)
    const firestore = getFirebase().firestore()
    firestore.collection('today').add({
        task: task.task,
        date: task.date,
        overdue: false,
        overdueDate: nextDay,
        userID: task.userID
    }).then(()=> {
        firestore.collection('tomorrow').doc(task.id).delete()
    })
}

export const toggleMenu = value => dispatch => {
    dispatch({type:'TOGGLE_MENU', payload: value})
}

