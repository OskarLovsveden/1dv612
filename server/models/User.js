import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    gitlabId: String
})

export const User = mongoose.model('User', userSchema)