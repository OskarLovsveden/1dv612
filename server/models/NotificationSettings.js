import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema({
    gitlab_id: String,
    group_id: String,
    channel_hook: String,
    token: String,
    issue: { type: Boolean, default: false },
    release: { type: Boolean, default: false }
}, {
    versionKey: false
})

schema.statics.updateSettings = function (id, update) {
    const filter = { gitlab_id: id }

    return this.findOneAndUpdate(filter, update, {
        new: true
    })
}

export const NotificationSettings = mongoose.model('NotificationSettings', schema)