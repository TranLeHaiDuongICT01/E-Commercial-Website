import * as api from "../api";
import { GET_PAYMENT, START_LOADING, END_LOADING } from "../utils/constantType";

export const getPayments = () => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.getPayments()
        dispatch({ type: GET_PAYMENT, payload: data.payments })
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}