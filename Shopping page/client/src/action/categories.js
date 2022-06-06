import * as api from '../api'
import { GET_CATEGORIES, START_LOADING, END_LOADING } from '../utils/constantType'

export const getCategories = () => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.getCategories()
        dispatch({ type: GET_CATEGORIES, payload: data.categories })
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}
