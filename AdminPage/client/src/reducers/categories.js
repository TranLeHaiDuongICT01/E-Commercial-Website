import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, GET_SINGLE_CATEGORY, UPDATE_CATEGORY } from "../utils/constantType";

const reducer = (state = { categories: [] }, action) => {
    switch (action.type) {
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