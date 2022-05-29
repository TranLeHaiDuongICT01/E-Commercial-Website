import * as api from '../api'
import { GET_CATEGORIES } from '../utils/constantType'

export const getCategories = () => async (dispatch) => {
    try {
        const { data } = await api.getCategories()
        dispatch({ type: GET_CATEGORIES, payload: data.categories })
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}
