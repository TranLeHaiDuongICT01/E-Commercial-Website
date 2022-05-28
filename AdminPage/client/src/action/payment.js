import * as api from "../api";
import { GET_PAYMENT } from "../utils/constantType";

export const getPayments = () => async (dispatch) => {
    try {
        const { data } = await api.getPayments()
        dispatch({ type: GET_PAYMENT, payload: data.payments })
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}