import { Request, Response } from 'express'
import JiraService from '../services/jiraService'

const getAssignedTickets = async (req: Request, res: Response) => {
  try {
    const assignedTickets = await JiraService.getAssignedTickets()
    const assignedTicketsSet = new Set(assignedTickets)

    const ticketsWithUserComments =
      await JiraService.getTicketsWithUserComments()
    const ticketsWithUserCommentsSet = new Set(ticketsWithUserComments)

    const combinedTickets = Array.from(
      new Set([...assignedTicketsSet, ...ticketsWithUserCommentsSet])
    )

    if (combinedTickets.length === 0) {
      return res.status(404).json({ message: 'No tickets found' })
    }
    return res.status(200).json(combinedTickets)
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'Jira resource not found' })
    }
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default {
  getAssignedTickets
}
