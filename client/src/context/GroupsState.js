import { useEffect, createContext, useReducer } from 'react'
import { reducer } from './GroupsReducer'

import * as axios from '../utils/axios-helper'

const initialState = {}
export const GroupsContext = createContext(initialState)

export const GroupsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const getGroups = async () => {
            try {
                const res = await axios.get('/api/gitlab/groups')
                setGroups(res.data)
                selectGroup(res.data[0])
            } catch (error) {
                console.error(error)
            }
        }

        getGroups()
    }, [])

    const setGroups = async (groups) => {
        dispatch({
            type: 'GROUPS_LOADED',
            payload: groups
        })
    }

    const selectGroup = async (group) => {
        dispatch({
            type: 'GROUP_SELECTED',
            payload: group
        })
    }

    return (
        <GroupsContext.Provider
            value={{
                groups: state.groups,
                selectedGroup: state.selectedGroup,
                selectGroup
            }}
        >
            {children}
        </GroupsContext.Provider>
    )
}
