import {getFirebase} from "react-redux-firebase";

export const addTask = (task) => (dispatch, getState, {getFirebase})=> {
    const firestore = getFirebase().firestore()
    firestore.collection(task.collection).add({
        task: task.task,
        date:task.date,
        overdue: false,
        userID: task.userID,
        overdueDate: task.overdueDate
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

export const moveTomorrowTasks = (task, collection1, collection2) => (dispatch, getState, {getFirebase}) => {
    const day = task.overdueDate.toDate();
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    const firestore = getFirebase().firestore()
    console.log(task)
    firestore.collection(collection1).add({
        task: task.task,
        date: task.date,
        overdue: false,
        overdueDate: nextDay,
        userID: task.userID
    }).then(()=> {
        firestore.collection(collection2).doc(task.id).delete()
    })
}

export const moveAfterTomorrowTasks = (task) => (dispatch, getState, {getFirebase}) => {
    const day = task.overdueDate.toDate();
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() - 1);
    console.log(nextDay)
    const firestore = getFirebase().firestore()
    firestore.collection('tomorrow').add({
        task: task.task,
        date: task.date,
        overdue:false,
        overdueDate:nextDay,
        userID: task.userID
    }).then(() => {
        firestore.collection('AfterTomorrow').doc(task.id).delete()
    })
}

export const toggleMenu = value => dispatch => {
    dispatch({type:'TOGGLE_MENU', payload: value})
}

