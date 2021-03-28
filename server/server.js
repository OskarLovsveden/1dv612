import express from 'express'
import connectRedis from 'connect-redis'
import { createClient } from 'redis'
import session from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'

import { setupPassport } from './config/passport-gitlab.js'
import { connectDB } from './config/mongoose.js'

// TODO - Add socket for real time updates
// import { connectSocket } from './utils/socket.js'

import { router } from './routes/router.js'

const main = async () => {
    await connectDB()

    const app = express()

    app.use(cors({
        origin: process.env.CLIENT_ORIGIN,
        credentials: true
    }))

    app.use(helmet())
    app.use(logger('dev'))
    app.use(express.json())

    const RedisStore = connectRedis(session)

    app.set('trust proxy', 1)

    app.use(session({
        store: new RedisStore({ client: createClient(process.env.REDIS_URL) }),
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }
    }))

    app.use(function (req, res, next) {
        if (!req.session) {
            return next(new Error('No session...'))
        }
        next()
    })

    setupPassport(app)

    app.use('/', router)

    // TODO - Add socket for real time updates
    // connectSocket(app).listen(process.env.PORT, () => {
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening at http://localhost:${process.env.PORT}`)
        console.log(`Press ctrl + C to terminate...`)
    })
}

main().catch(console.error)