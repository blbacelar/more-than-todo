import { Request, Response } from 'express'
import GitHubAxiosService from '../services/gitHubAxiosService'
import JiraService from '../services/jiraService'

const getMyTasks = async (req: Request, res: Response) => {
  try {
    const [pullRequests, tickets] = await Promise.all([
      GitHubAxiosService.getOpenPullRequests(),
      JiraService.getAssignedTickets()
    ])

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
      }
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

export default {
  getMyTasks
}
