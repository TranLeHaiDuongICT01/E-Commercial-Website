import { createContext } from "react";

export const AuthContext = createContext({
    cart: [],
    token: null,
    userId: null,
    login: () => { },
    logout: () => { },
    setCart: () => { }
})