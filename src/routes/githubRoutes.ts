// routes/githubRoutes.ts

import express from 'express'
import GitHubController from '../controllers/gitHubController'

const router = express.Router()

router.get('/open-prs', GitHubController.getOpenPullRequests)

export default router
