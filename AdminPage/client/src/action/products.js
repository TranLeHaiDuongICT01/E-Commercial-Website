import * as api from '../api/index'
import { GET_PRODUCTS, START_LOADING, END_LOADING, GET_SINGLE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../utils/constantType'
export const getProducts = () => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.getProducts()
        dispatch({ type: GET_PRODUCTS, payload: data })
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}

export const getSingleProduct = (id) => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.getSingleProduct(id)
        dispatch({ type: GET_SINGLE_PRODUCT, payload: data.product })
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}

export const createProduct = (product) => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.createProduct(product)
        dispatch({ type: CREATE_PRODUCT, payload: data.product })
        dispatch(({ type: END_LOADING }))
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}

export const updateProduct = (id, product) => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.updateProduct(id, product)
        dispatch({ type: UPDATE_PRODUCT, payload: data.product })
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
        dispatch(({ type: END_LOADING }))
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch(({ type: START_LOADING }))
        const { data } = await api.deleteProduct(id)
        dispatch({ type: DELETE_PRODUCT, payload: data.product })
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
        dispatch(({ type: END_LOADING }))
    }
}