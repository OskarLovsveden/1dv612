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
    }, async (token, tokenSecret, profile, done) => {
        const currentUser = await GLUser.findOne({
            gitlab_id: profile.id
        })

        if (!currentUser) {
            const newUser = await new GLUser({
                name: profile.displayName,
                gitlab_id: profile.id
            }).save()

            if (newUser) {
                done(null, newUser)
            }
        }
        done(null, currentUser)
    }))
}