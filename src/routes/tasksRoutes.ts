import express from 'express'
import { getMyTasks } from '../controllers/myTasksController'

const router = express.Router()

router.get('/tasks', getMyTasks)

export default router
