import { useEffect, createContext, useReducer } from 'react'
import UserReducer from './AuthReducer'
import axios from 'axios'

const initialState = {
    user: null
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, initialState)

    useEffect(() => {
        checkForUser()
    }, [])

    const checkForUser = async () => {
        const res = await axios('/auth/gitlab/check', {
            withCredentials: true,
            baseURL: process.env.REACT_APP_SERVER_URL
        })

        if (res.data) {
            login(res.data)
        }
    }

    const isAuthenticated = () => {
        return state.user ? true : false
    }

    const login = (user) => {
        dispatch({
            type: 'USER_LOGIN',
            payload: user
        })
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isAuthenticated,
                login
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
