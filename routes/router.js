import express from 'express'
import createError from 'http-errors'
import { router as authRouter } from './auth/router.js'

export const router = express.Router()

router.use('/auth', authRouter)
router.use('*', (req, res, next) => next(createError(404)))
