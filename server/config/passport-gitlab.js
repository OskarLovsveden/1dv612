import passport from 'passport'
import { Strategy as GitLabStrategy } from 'passport-gitlab2'
import { GLUser } from '../models/GLUser.js'

export const setupPassport = (app) => {

    app.use(passport.initialize())
    app.use(passport.session())

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
        const user = await GLUser.findOrCreate(profile, token)
        await user.save()

        done(null, user)
    }))
}