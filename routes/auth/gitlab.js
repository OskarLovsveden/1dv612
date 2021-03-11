import express from 'express'
import passport from 'passport'

import { GitLabController } from '../../controllers/gitlab-controller.js'

export const router = express.Router()

const controller = new GitLabController()

router.get('/', passport.authenticate('gitlab'))

router.get('/callback', passport.authenticate('gitlab'), (req, res) => { res.redirect('/') })