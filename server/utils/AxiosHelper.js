import axios from 'axios'

/**
 * Helper for making axios requests.
 *
 * @class AxiosHelper
 */
export default class AxiosHelper {

    /**
     * Get request.
     *
     * @param {string} path - The path appended to the base url.
     * @param {string} token - The bearer token.
     * @param {string} [baseUrl] - The base url of the request.
     * @return {Promise} The response of the request as a promise.
     */
    async get(path, token, baseUrl) {
        const url = baseUrl ? baseUrl + path : path

        const response = await axios(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return response
    }
}