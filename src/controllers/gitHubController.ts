// controllers/GitHubController.ts

import { Request, Response } from 'express'
import { getOpenPR } from '../services/gitHubAxiosService'

export const getOpenPullRequests = async (req: Request, res: Response) => {
  try {
    const pullRequests = await getOpenPR()
    if (pullRequests.length === 0) {
      return res.status(404).json({ message: 'No open pull requests found' })
    }
    return res.status(200).json(pullRequests)
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'GitHub resource not found' })
    }
    return res.status(500).json({ message: error.message })
  }
}
