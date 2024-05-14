import express from 'express';
import { addCommentToTask, fetchAndSaveTasks, getAllTasks, getCommentsByTask, markTaskComplete } from '../controllers/tasksController';

const router = express.Router()

router.get('/get-tasks', fetchAndSaveTasks)
router.get('/tasks', getAllTasks);
router.put('/tasks/:id/complete', markTaskComplete);
router.post('/tasks/:taskId/comments', addCommentToTask);
router.get('/tasks/:taskId/comments', getCommentsByTask);

export default router
