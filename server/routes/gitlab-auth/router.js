import express from 'express'
import { router as gitlabAuthRouter } from './gitlab.js'

export const router = express.Router()

router.use('/gitlab', gitlabAuthRouter)
