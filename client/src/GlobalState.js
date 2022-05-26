import React, { createContext, useState } from "react";

export const GlobalState = createContext()


export const DataProvider = ({ children }) => {

    const [token, setToken] = useState(false)
    const [user, setUser] = useState(false)

    const state = {
        token: [token, setToken],
        user: [user, setUser]
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}