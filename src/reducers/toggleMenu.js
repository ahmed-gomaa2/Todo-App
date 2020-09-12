export default function toggleMenu (state=false, action) {
    console.log(action)
    switch (action.type) {
        case 'TOGGLE_MENU':
            return action.payload
        default:
            return state
    }
}