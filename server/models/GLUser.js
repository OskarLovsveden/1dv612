import mongoose from 'mongoose'
const { Schema } = mongoose

const schema = new Schema({
    name: String,
    gitlab_id: String,
    avatar: String,
    token: String,
    last_login: Date,
}, {
    versionKey: false
})

schema.statics.findOrCreate = function (profile, token) {
    const filter = { gitlab_id: profile.id }
    const update = {
        name: profile.displayName,
        avatar: profile.avatarUrl,
        token: token
    }

    return this.findOneAndUpdate(filter, update, {
        upsert: true,
        new: true
    })
}

schema.statics.logout = async function (id) {
    const filter = { _id: id }
    const update = { last_login: Date.now() }
    await this.findOneAndUpdate(filter, update)
}

export const GLUser = mongoose.model('GLUser', schema)