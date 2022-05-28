import { AUTH, LOGOUT, GET_USER_INFO, UPDATE_USER } from "../utils/constantType";

const reducer = (state = { user: null }, action) => {
    switch (action.type) {
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