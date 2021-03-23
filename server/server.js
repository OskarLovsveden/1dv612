import express from 'express'
import session from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import passport from 'passport'

import { router } from './routes/router.js'
import { setupPassport } from './config/passport-gitlab.js'
import { connectDB } from './config/mongoose.js'

const main = async () => {
    await connectDB()

    const app = express()

    app.use(cors({
        origin: process.env.CLIENT_ORIGIN,
        credentials: true
    }))

    app.use(helmet())
    app.use(logger('dev'))

    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000 }
    }))

    app.use(passport.initialize())
    app.use(passport.session())
    setupPassport()

    app.use('/', router)

    app.listen(process.env.PORT, () => {
        console.log(`Example app listening at http://localhost:${process.env.PORT}`)
        console.log(`Press ctrl + C to terminate...`)
    })
}

main().catch(console.error)