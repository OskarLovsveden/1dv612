import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema({
    gitlab_id: String,
    group_id: String,
    channel_hook: String
}, {
    versionKey: false
})

schema.statics.updateSettings = function (id, url) {
    const filter = { gitlab_id: id }
    const update = { channel_hook: url }

    return this.findOneAndUpdate(filter, update, {
        upsert: true,
        new: true
    })
}

export const NotificationSettings = mongoose.model('NotificationSettings', schema)