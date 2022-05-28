import * as api from '../api'
import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORIES, GET_SINGLE_CATEGORY, UPDATE_CATEGORY } from '../utils/constantType'

export const getCategories = () => async (dispatch) => {
    try {
        const { data } = await api.getCategories()
        dispatch({ type: GET_CATEGORIES, payload: data.categories })
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}

export const createCategory = (category) => async (dispatch) => {
    try {
        const { data } = await api.createCategory(category)
        dispatch({ type: CREATE_CATEGORY, payload: data.category })
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        const { data } = await api.deleteCategory(id)
        dispatch({ type: DELETE_CATEGORY, payload: data.category })
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}

export const updateCategory = (id, category) => async (dispatch) => {
    try {
        const { data } = await api.updateCategory(id, category)
        dispatch({ type: UPDATE_CATEGORY, payload: data.category })
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}

export const getSingleCategory = (id) => async (dispatch) => {
    try {
        const { data } = await api.getSingleCategory(id)
        dispatch({ type: GET_SINGLE_CATEGORY, payload: data.category })
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}