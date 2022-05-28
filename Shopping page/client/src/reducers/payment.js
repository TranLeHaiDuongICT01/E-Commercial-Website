import { PAYMENT,USER_HISTORY } from "../utils/constantType";

const reducer = (state = { payments: [] }, action) => {
    switch (action.type) {
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