export const reducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                user: action.payload
            }
        default:
            return state
    }
}

export default reducer