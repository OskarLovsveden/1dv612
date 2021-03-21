import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema({
    name: String,
    gitlab_id: String
})

export const GLUser = mongoose.model('GLUser', schema)