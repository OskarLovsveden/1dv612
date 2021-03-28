export const reducer = (state, action) => {
    switch (action.type) {
        case 'GROUPS_LOADED':
            return {
                ...state,
                groups: action.payload
            }
        case 'GROUP_SELECTED':
            return {
                ...state,
                selectedGroup: action.payload
            }
        default:
            return state
    }
}

export default reducer