import express from 'express'
// import createError from 'http-errors'

export const router = express.Router()

router.get('/login', (req, res, next) => res.send('We loggin in bois'))
