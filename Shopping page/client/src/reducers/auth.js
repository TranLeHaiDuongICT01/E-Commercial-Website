import { AUTH, LOGOUT, GET_USER_INFO, UPDATE_USER, START_LOADING, END_LOADING } from "../utils/constantType";

const reducer = (state = { user: null, isLoading: true }, action) => {
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
        case AUTH:
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: null
            }
        case GET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                userInfo: action.payload
            }
        default:
            return state
    }
}

export default reducer