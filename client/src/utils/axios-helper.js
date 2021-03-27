import axios from 'axios'

export const get = async (path) => {
    const res = await axios(path, {
        withCredentials: true,
        baseURL: process.env.REACT_APP_SERVER_URL
    })

    return res
}