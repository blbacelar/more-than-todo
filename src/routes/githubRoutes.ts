// routes/githubRoutes.ts

import express from 'express'
import { getOpenPullRequests } from '../controllers/gitHubController'

const router = express.Router()

router.get('/open-prs', getOpenPullRequests)

export default router
