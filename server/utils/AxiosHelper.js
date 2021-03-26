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

    async setHook(groupID, token) {
        const url = `${process.env.GITLAB_API_BASE_URL}/groups/${groupID}/hooks`

        const params = new URLSearchParams()
        params.append('url', 'https://17015c7393bc.ngrok.io/webhook/gitlab')
        params.append('token', process.env.GITLAB_WEBHOOK_TOKEN)
        params.append('issues_events', true)

        const response = await axios(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: params
        })

        return response
    }
}