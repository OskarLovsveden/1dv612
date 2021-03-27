import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema({
    gitlab_id: String,
    channel_hook: String,
    issue: { type: Boolean, default: false }
}, {
    versionKey: false
})

export const NotificationSettings = mongoose.model('NotificationSettings', schema)