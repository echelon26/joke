import jokesClient from '../api/jokes'
const api = new jokesClient()

export const getRandomJoke = () => dispatch => {
    return api.getRandomJoke().then(joke => {
        return dispatch({
            type: 'RANDOM_JOKE',
            payload: joke
        })
    })
    .catch(err => console.log("Could not get random joke!"))
}

export const getJokes = (params) => dispatch => {
    return api.getJokes(params).then(jokes => {
        return dispatch({
            type: 'JOKES',
            payload: jokes
        })
    })
    .catch(err => console.log("Could not get jokes!"))
}

export const addJoke = (params) => dispatch => {
    return api.addJoke(params)
    .then(joke => dispatch(getJokes()))
    .catch(err => {
        console.log("Could not add a joke!")
        dispatch({ type: 'FAILED_TO_ADD_JOKE', payload: err })
        dispatch({ type: 'DISMISS_ERR', payload: null})
    })
}

export const editJoke = (params) => dispatch => {
    return api.editJoke(params)
    .then(joke => dispatch(getJokes()))
    .catch(err => {
        console.log("Could not edit joke!")
        dispatch({ type: 'FAILED_TO_EDIT_JOKE', payload: err })
        dispatch({ type: 'DISMISS_ERR', payload: null})
    })
}

export const deleteJoke = (params) => dispatch => {
    return api.deleteJoke(params)
    .then(joke => dispatch(getJokes()))
    .catch(err => {
        console.log("Could not delete joke!")
        dispatch({ type: 'FAILED_TO_DELETE_JOKE', payload: err })
        dispatch({ type: 'DISMISS_ERR', payload: null})
    })
}