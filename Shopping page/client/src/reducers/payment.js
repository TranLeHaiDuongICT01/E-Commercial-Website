import { PAYMENT, USER_HISTORY, START_LOADING, END_LOADING } from "../utils/constantType";

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
        case PAYMENT:
            return {
                ...state,
                payments: [
                    ...state.payments,
                    action.payload
                ]
            }
        case USER_HISTORY:
            return {
                ...state,
                payment: action.payload
            }
        default:
            return state
    }
}
export default reducer