import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema({
    name: String,
    gitlab_id: String,
    avatar: String,
    token: String
}, {
    versionKey: false
})

export const GLUser = mongoose.model('GLUser', schema)