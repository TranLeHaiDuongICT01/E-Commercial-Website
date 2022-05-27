import { useState, useCallback, useEffect } from "react";
export const useAuth = () => {
    const [token, setToken] = useState(false)
    const [userId, setUserId] = useState(false)
    const [cart, setCart] = useState([])
    const login = useCallback((userId, token, cart) => {
        setToken(token)
        setUserId(userId)
        setCart(cart)
        localStorage.setItem('user', JSON.stringify({ userId: userId, token: token }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('user')
    }, [])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'))
        if (data && data?.token) {
            login(data.userId, data.token, cart)
        }
    }, [login])

    return { token, login, logout, userId, cart, setCart }

}