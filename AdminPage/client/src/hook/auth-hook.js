import { useState, useCallback, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { START_LOADING, END_LOADING } from '../utils/constantType'
export const useAuth = () => {
    const [token, setToken] = useState(false)
    const [userId, setUserId] = useState(false)
    const dispatch = useDispatch()

    const login = useCallback((userId, token) => {
        setToken(token)
        setUserId(userId)
        localStorage.setItem('user', JSON.stringify({ userId: userId, token: token }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('user')
    }, [])
    useEffect(() => {
        dispatch({ type: START_LOADING })
        const data = JSON.parse(localStorage.getItem('user'))
        if (data && data?.token) {
            login(data.userId, data.token)
        }
        dispatch({ type: END_LOADING })
    }, [login])

    return { token, login, logout, userId }

}