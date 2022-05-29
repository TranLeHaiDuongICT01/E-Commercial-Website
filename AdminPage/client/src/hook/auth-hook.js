import { useState, useCallback, useEffect } from "react";
let logoutTimer
export const useAuth = () => {
    const [tokenExpirationDate, setTokenExpirationDate] = useState()
    const [token, setToken] = useState(false)
    const [userId, setUserId] = useState(false)
    const login = useCallback((userId, token, cart, expirationDate) => {
        setToken(token)
        setUserId(userId)
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24)
        setTokenExpirationDate(tokenExpirationDate)
        localStorage.setItem('user', JSON.stringify({ userId: userId, token: token, expiration: tokenExpirationDate.toISOString() }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setTokenExpirationDate(null)
        setUserId(null)
        localStorage.removeItem('user')
    }, [])

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime = tokenExpirationDate.getTime() - (new Date()).getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer)

        }
    }, [token, logout, tokenExpirationDate])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))

        if (data && data?.token && new Date(data?.expiration) > new Date()) {
            login(data.userId, data.token)
        }
    }, [login])

    return { token, login, logout, userId}

}