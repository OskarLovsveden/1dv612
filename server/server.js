import express from 'express'
import session from 'express-session'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'
import passport from 'passport'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { router } from './routes/router.js'
import { passportInit } from './helpers/passport-gitlab.js'

const app = express()

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_ORIGIN
    }
})


app.use(helmet())
app.use(cors({
    origin: process.env.CLIENT_ORIGIN
}))
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
app.set('io', io)

server.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
    console.log(`Press ctrl + C to terminate...`)
})

io.on('connection', (socket) => {
    console.log(socket.id)
});