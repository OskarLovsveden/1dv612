import express from 'express'
import { router as gitlabRouter } from './gitlab.js'

export const router = express.Router()

router.use('/gitlab', gitlabRouter)
