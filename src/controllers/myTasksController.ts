import { Request, Response } from 'express';
import Task from '../models/Task';
import GitHubAxiosService from '../services/gitHubAxiosService';
import GoogleCalendarService from '../services/googleService';
import JiraService from '../services/jiraService';

export const getMyTasks = async (req: Request, res: Response) => {
  try {
    const pullRequests = await GitHubAxiosService.getOpenPullRequests()
    const tickets = await JiraService.getAssignedTickets()
    const google = {
      events: await GoogleCalendarService.getUpcomingEvents(),
      calendarList: await GoogleCalendarService.getListOfCalendars()
    }

    if (pullRequests.length === 0 && tickets.length === 0) {
      return res
        .status(404)
        .json({ message: 'No open pull requests or assigned tickets found' })
    }

    const data = {
      jira: {
        tickets
      },
      github: {
        pullRequests
      },
      google
    }

    return res.status(200).json({
      data
    })
  } catch (error: any) {
    console.error('Error fetching tasks:', error)
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'Resource not found' })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

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
      { status: 'Complete' },
      { new: true },
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
