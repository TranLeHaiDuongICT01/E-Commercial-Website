import { LOGOUT, AUTH, GET_USER_INFO } from "../utils/constantType";
import * as api from '../api/index'

export const login = (user, navigate) => async (dispatch) => {
    try {
        const { data } = await api.login(user)
        dispatch({ type: AUTH, payload: data })
        navigate('/')
        return data
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}

export const register = (user, navigate) => async (dispatch) => {
    try {
        const { data } = await api.register(user)
        dispatch({ type: AUTH, payload: data })
        navigate('/')
        return data
    } catch (error) {
        console.log(error);
        window.alert(JSON.stringify(error?.response?.data?.msg))
    }
}

export const logout = (navigate) => async (dispatch) => {
    try {
        await api.logout()
        dispatch({ type: LOGOUT })
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const getUserInfo = () => async (dispatch) => {
    try {
        const { data } = await api.getUserInfo()
        dispatch({ type: GET_USER_INFO, payload: data.user })
    } catch (error) {
        console.log(error);
    }   
}

