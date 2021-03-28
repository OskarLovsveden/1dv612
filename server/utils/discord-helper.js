import * as axios from './axios-helper.js'

const formatIssue = (data) => {
    const { user, object_attributes, object_kind } = data

    return {
        "username": "ol222hf - 1dv612",
        "avatar_url": "https://i.imgur.com/0KYaO3T.gif",
        "content": "New " + object_kind,
        "embeds": [
            {
                "author": {
                    "name": user.name,
                    "icon_url": user.avatar_url
                },
                "title": object_attributes.title,
                "url": object_attributes.url,
                "description": object_attributes.description,
                "color": 15258703
            }
        ]
    }
}

const formatRelease = (data) => {
    console.log(data)
    const { description, url, name, object_kind, tag } = data

    return {
        "username": "ol222hf - 1dv612",
        "avatar_url": "https://i.imgur.com/0KYaO3T.gif",
        "content": "New " + object_kind,
        "embeds": [
            {
                "title": name,
                "url": url,
                "description": description,
                "color": 10316792,
                "fields": [
                    {
                        "name": "Tag",
                        "value": tag,
                        "inline": true
                    }
                ]
            }
        ]
    }
}

export const send = async (channelHook, data) => {
    const { object_kind } = data
    let msg

    switch (object_kind) {
        case 'issue':
            msg = formatIssue(data)
            break
        case 'release':
            msg = formatRelease(data)
            break
        default:
            break
    }

    await axios.triggerDiscordHook(channelHook, msg)
}