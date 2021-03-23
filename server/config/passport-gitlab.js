import passport from 'passport'
import { Strategy as GitLabStrategy } from 'passport-gitlab2'
import { GLUser } from '../models/GLUser.js'

export const setupPassport = () => {

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await GLUser.findById(id)
            done(null, user)
        } catch (error) {
            done(new Error("Failed to deserialize an user"))
        }
    })

    passport.use(new GitLabStrategy({
        clientID: process.env.GITLAB_APP_ID,
        clientSecret: process.env.GITLAB_APP_SECRET,
        callbackURL: 'http://localhost:8000/auth/gitlab/callback',
        baseURL: 'https://gitlab.lnu.se'
    }, async (token, refreshToken, profile, done) => {
        const filter = { gitlab_id: profile.id }
        const update = {
            name: profile.displayName,
            avatar: profile.avatarUrl,
            token: token
        }

        const user = await GLUser.findOneAndUpdate(filter, update, {
            upsert: true,
            new: true
        })

        user.save()
        done(null, user)
    }))
}