import { GET_PAYMENT, START_LOADING, END_LOADING } from "../utils/constantType";

const reducer = (state = { payments: [], isLoading: true }, action) => {
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
        case GET_PAYMENT:
            return {
                ...state,
                payments: action.payload
            }
        default:
            return state
    }
}
export default reducer