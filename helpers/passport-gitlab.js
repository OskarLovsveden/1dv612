import passport from 'passport'
import { Strategy as GitLabStrategy } from 'passport-gitlab2'

export const passportInit = () => {

    // Allowing passport to serialize and deserialize users into sessions
    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((obj, done) => done(null, obj))

    // The callback that is invoked when an OAuth provider sends back user 
    // information. Normally, you would save the user to the database 
    // in this callback and it would be customized for each provider
    const callback = (accessToken, refreshToken, profile, cb) => {
        console.log(profile)
        cb(null, profile.id)
    }

    passport.use(new GitLabStrategy({
        clientID: process.env.GITLAB_APP_ID,
        clientSecret: process.env.GITLAB_APP_SECRET,
        callbackURL: 'http://localhost:8000/auth/gitlab/callback',
        baseURL: 'https://gitlab.lnu.se'
    }, callback))
}