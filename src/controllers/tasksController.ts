import dotenv from 'dotenv';
import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Task from '../models/Task';
import { getOpenPR } from '../services/gitHubAxiosService';
import JiraService from '../services/jiraService';

dotenv.config()

const JIRA_URL = process.env.JIRA_BASE_URL

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const newTask = new Task({
      title,
      description,
      status: 'Open',
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const markTaskComplete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { completed: true, completedAt: new Date() },
      { new: true }, // Retorna o documento atualizado
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchAndSaveTasks = async (req: Request, res: Response) => {
  try {
    const { githubUsername, githubRepo } = req.body;

    // Fetch GitHub PRs
    const prs = await getOpenPR();
    const githubTasks = prs.map(pr => ({
      source: 'GitHub',
      sourceId: pr.id.toString(),
      title: pr.title,
      status: pr.state,
      url: pr.url,
      key: pr.id,
    }));

    // Fetch Jira Tickets
    const jiraTickets = await JiraService.getAssignedTickets();
    const jiraTasks = jiraTickets.map(ticket => ({
      source: 'Jira',
      sourceId: ticket.id,
      title: ticket.summary,
      status: ticket.statusName,
      url: `${JIRA_URL}/browse/${ticket.key}`,
      key: ticket.key,
    }));

    // Fetch Jira Tickets
    const jiraCommentTickets = await JiraService.getTicketsWithUserComments();
    const jiraCommentTasks = jiraCommentTickets.map(ticket => ({
      source: 'Jira',
      sourceId: ticket.id,
      title: ticket.summary,
      status: ticket.statusName,
      url: `${JIRA_URL}/browse/${ticket.key}`,
      key: ticket.key,
    }));

    // Combine tasks
    const tasks = [...githubTasks, ...jiraTasks, ...jiraCommentTasks];

    // Save tasks to database
    for (const task of tasks) {
      const existingTask = await Task.findOne({ source: task.source, sourceId: task.sourceId });
      if (!existingTask) {
        await new Task(task).save();
      }
    }

    const allTasks = await Task.find({ completed: false });
    res.status(200).json(allTasks);
  } catch (error: any) {
    console.error('Error in fetchAndSaveTasks:', error);
    res.status(500).json({ message: 'Failed to fetch and save tasks', error: error.message });
  }
};

// Adicionar um comentário a uma tarefa
export const addCommentToTask = async (req: Request, res: Response) => {
  try {
    const { taskId, user, comment } = req.body;
    const newComment = new Comment({
      taskId,
      user,
      comment
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar comentários de uma tarefa
export const getCommentsByTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const comments = await Comment.find({ taskId });
    res.json(comments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
