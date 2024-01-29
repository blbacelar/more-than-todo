import express from 'express'
import TasksController from '../controllers/myTasksController'

const router = express.Router()

router.get('/tasks', TasksController.getMyTasks)

export default router
