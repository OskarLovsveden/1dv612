import * as axios from './axios-helper.js'

export const send = async (webhookUrl, issue) => {
    console.log(issue)
    const { user, object_attributes, object_kind } = issue

    // description instructions 
    // "description": "Text message. You can use Markdown here. *Italic* **bold** __underline__ ~~strikeout~~ [hyperlink](https://google.com) `code`"

    const msg = {
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

    await axios.triggerDiscordHook(webhookUrl, msg)
}