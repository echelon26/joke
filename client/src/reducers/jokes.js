const initialState = {
    randomJoke: null,
    jokesView: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "RANDOM_JOKE":
            return { ...state, randomJoke: action.payload }
        case "JOKES":
            return { ...state, jokesView: action.payload }
        case "FAILED_TO_ADD_JOKE":
        case "FAILED_TO_EDIT_JOKE":
        case "FAILED_TO_DELETE_JOKE":
            return { ...state, error: action.payload }
        case "DISMISS_ERR":
            return { ...state, error: action.payload }
        default:
            return state
    }
}