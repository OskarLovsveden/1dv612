import express from 'express'
import passport from 'passport'

import { GitLabController } from '../../controllers/gitlab-controller.js'

export const router = express.Router()

const controller = new GitLabController()

router.get('/', passport.authenticate('gitlab'))

router.get('/callback', passport.authenticate('gitlab', {
    successRedirect: process.env.CLIENT_ORIGIN,
    failureRedirect: '/auth/gitlab/failed'
}))

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect(process.env.CLIENT_ORIGIN)
})

router.get('/success', (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: 'user has successfully authenticated',
            user: req.user
        })
    }
})

router.get('/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'user failed to authenticate.'
    })
})
