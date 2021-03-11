import express from 'express'
import session from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import passport from 'passport'

import { router } from './routes/router.js'
import { passportInit } from './helpers/passport-gitlab.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(logger('dev'))

app.use(session({
    secret: 'secrets',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passportInit()

app.use('/', router)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
    console.log(`Press ctrl + C to terminate...`)
})  