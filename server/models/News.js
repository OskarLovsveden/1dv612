import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema({
    gitlab_id: String,
    issue_id: String
}, {
    versionKey: false
})

export const News = mongoose.model('News', schema)