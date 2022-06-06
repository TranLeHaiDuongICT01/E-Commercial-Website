import { END_LOADING, GET_CATEGORIES, START_LOADING } from "../utils/constantType";

const reducer = (state = { isLoading: true, categories: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case END_LOADING:
            return {
                ...state,
                isLoading: false
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
}

export default reducer