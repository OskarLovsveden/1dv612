import express from 'express'
import axios from 'axios'

// import { GitLabApiController as Controller } from '../../controllers/gitlab-api-controller.js'

export const router = express.Router()

// const controller = new Controller()

router.get('/groups', async (req, res, next) => {
    try {
        const response = await axios('https://gitlab.lnu.se/api/v4/groups?min_access_level=50', {
            headers: {
                'Authorization': 'Bearer ' + req.user.token
            }
        })

        const groups = response.data.map(group => ({
            "id": group.id,
            "web_url": group.web_url,
            "name": group.name
        }))

        res.send(groups)

    } catch (error) {
        next(error)
    }
})