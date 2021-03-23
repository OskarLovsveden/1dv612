import express from 'express'
import { router as gitlabApiRouter } from './gitlab.js'

export const router = express.Router()

router.use('/gitlab', gitlabApiRouter)
