import axios from 'axios'

export const get = async (path) => {
    const res = await axios(path, {
        withCredentials: true,
        baseURL: process.env.REACT_APP_SERVER_URL
    })

    return res
}

export const post = async (path, data) => {
    const res = await axios(path, {
        method: 'POST',
        withCredentials: true,
        baseURL: process.env.REACT_APP_SERVER_URL,
        data: data
    })

    return res
}

export const remove = async (path) => {
    const res = await axios(path, {
        method: 'DELETE',
        withCredentials: true,
        baseURL: process.env.REACT_APP_SERVER_URL
    })

    return res
}