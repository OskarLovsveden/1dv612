import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import logger from 'morgan'

import { router } from './routes/router.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(logger('dev'))

app.use('/', router)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
    console.log(`Press ctrl + C to terminate...`)
})  