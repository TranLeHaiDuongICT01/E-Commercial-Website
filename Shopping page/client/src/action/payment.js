import * as api from "../api";
import { PAYMENT, USER_HISTORY, START_LOADING, END_LOADING } from "../utils/constantType";

export const createPayment = (payment) => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.createPayment(payment)
        dispatch({ type: PAYMENT, payload: data.payment })
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}

export const getUserHistory = () => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.getUserHistory()
        dispatch(({ type: USER_HISTORY, payload: data.history }))
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}