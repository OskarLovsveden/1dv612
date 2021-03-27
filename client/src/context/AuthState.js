import { useEffect, createContext, useReducer } from 'react'
import { reducer } from './AuthReducer'

import * as axios from '../utils/axios-helper'

const initialState = {
    user: null
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const checkForUser = async () => {
            try {
                const res = await axios.get('/auth/gitlab/check')
                res.data && login(res.data)

            } catch (error) {
                console.error(error)
            }
        }

        checkForUser()
    }, [])


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
