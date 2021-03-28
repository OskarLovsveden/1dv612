import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema({
    gitlab_id: String,
    group_id: String,
    channel_hook: String,
    token: String
}, {
    versionKey: false
})

schema.statics.updateSettings = function (id, url, token) {
    const filter = { gitlab_id: id }
    const update = { channel_hook: url, token: token }

    return this.findOneAndUpdate(filter, update, {
        new: true
    })
}

export const NotificationSettings = mongoose.model('NotificationSettings', schema)