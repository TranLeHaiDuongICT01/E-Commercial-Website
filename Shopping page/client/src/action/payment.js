import * as api from "../api";
import { PAYMENT, USER_HISTORY } from "../utils/constantType";

export const createPayment = (payment) => async (dispatch) => {
    try {
        const { data } = await api.createPayment(payment)
        dispatch({ type: PAYMENT, payload: data.payment })
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}

export const getUserHistory = () => async (dispatch) => {
    try {
        const { data } = await api.getUserHistory()
        dispatch(({ type: USER_HISTORY, payload: data.history }))
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}