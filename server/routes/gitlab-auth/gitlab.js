import express from 'express'
import passport from 'passport'
import { GLUser } from '../../models/GLUser.js'

// import { GitLabAuthController as Controller} from '../../controllers/gitlab-controller.js'

export const router = express.Router()

// const controller = new Controller()

router.get('/', passport.authenticate('gitlab', {
    scope: ['api read_user read_api read_repository write_repository read_registry write_registry sudo openid profile email']
}))

router.get('/callback', passport.authenticate('gitlab', {
    successRedirect: process.env.CLIENT_ORIGIN,
    failureRedirect: '/auth/gitlab/failed'
}))

router.get('/logout', async (req, res) => {
    await GLUser.logout(req.user._id)

    req.logout()
    res.redirect(process.env.CLIENT_ORIGIN)
})

router.get('/success', (req, res) => {
    res.json({
        success: true,
        message: 'user has successfully authenticated'
    })
})

router.get('/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'user failed to authenticate.'
    })
})

router.get('/check', (req, res) => {
    res.json(req.user)
})
