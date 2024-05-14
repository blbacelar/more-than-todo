import express from 'express';
import { addCommentToTask, fetchAndSaveTasks, getCommentsByTask, getCompletedTasks, markTaskComplete } from '../controllers/tasksController';

const router = express.Router()

router.get('/get-tasks', fetchAndSaveTasks)
router.get('/completed-tasks', getCompletedTasks);
router.put('/tasks/:id/complete', markTaskComplete);
router.post('/tasks/:taskId/comments', addCommentToTask);
router.get('/tasks/:taskId/comments', getCommentsByTask);

export default router
