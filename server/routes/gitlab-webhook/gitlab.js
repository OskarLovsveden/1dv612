import express from 'express'
import axios from 'axios'

// import { GitLabWebhookController as Controller } from '../../controllers/gitlab-webhook-controller.js'

export const router = express.Router()

// const controller = new Controller()

router.post('/', async (req, res, next) => { console.log('doFunkyShit') })