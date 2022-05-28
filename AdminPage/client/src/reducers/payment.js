import { GET_PAYMENT } from "../utils/constantType";

const reducer = (state = { payments: [] }, action) => {
    switch (action.type) {
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