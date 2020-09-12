export default function(state= {}, action) {
    switch (action.type) {
        case 'SIGN_IN':
            console.log('signed You In ')
            return state
        case 'SIGN_IN_ERR':
            console.log(action.payload + 'there is some err')
            return state
        case 'SIGN_OUT':
            console.log('we signed you out ')
            return state
        case 'SIGN_UP':
            console.log("signed you up")
            return state
        case 'SIGN_UP_ERR':
            console.log( action.payload + ' error might have happened')
            return state
        default:
            return state
    }
}