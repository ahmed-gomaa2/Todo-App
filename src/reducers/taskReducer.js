export default function (state={}, action){
    switch (action.type) {
        case 'ADD_TASK': {
            console.log('added task')
            return state
        }
        case 'ADD_TASK_ERR': {
            console.log('added task')
            return state
        }
        default: return state
    }
}