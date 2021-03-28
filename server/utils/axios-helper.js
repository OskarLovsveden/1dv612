import axios from 'axios'

/**
 * Get request.
 *
 * @param {string} path - The path appended to the base url.
 * @param {string} token - The bearer token.
 * @param {string} [baseUrl] - The base url of the request.
 * @return {Promise} The response of the request as a promise.
 */
export const get = async (path, token, baseUrl) => {
    const url = baseUrl ? baseUrl + path : path

    const response = await axios(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return response
}

export const setHook = async (groupID, token, webhookUrl, options) => {
    const { issue } = options

    const url = `${process.env.GITLAB_API_BASE_URL}/groups/${groupID}/hooks`

    const params = new URLSearchParams()
    params.append('url', webhookUrl)
    params.append('token', process.env.GITLAB_WEBHOOK_TOKEN)
    params.append('issues_events', issue)

    const response = await axios(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data: params
    })

    return response
}

export const triggerDiscordHook = async (url, msg) => {
    const response = await axios(url, {
        method: 'POST',
        data: msg
    })

    return response
}