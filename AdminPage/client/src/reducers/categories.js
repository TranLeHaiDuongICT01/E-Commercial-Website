import { CREATE_CATEGORY, DELETE_CATEGORY, END_LOADING, GET_CATEGORIES, GET_SINGLE_CATEGORY, START_LOADING, UPDATE_CATEGORY } from "../utils/constantType";

const reducer = (state = { isLoading: true, categories: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case CREATE_CATEGORY:
            return {
                ...state,
                categories: [
                    ...state.categories,
                    action.payload
                ]
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state?.categories?.filter(category => category?._id !== action.payload?._id)
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                categories: state?.categories?.map(category => category._id === action.payload._id ? action.payload : category)
            }
        case GET_SINGLE_CATEGORY:
            return {
                ...state,
                category: action.paylaod
            }
        default:
            return state
    }
}

export default reducer