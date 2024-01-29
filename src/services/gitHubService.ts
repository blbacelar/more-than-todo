import { Octokit } from '@octokit/rest'
import dotenv from 'dotenv'

dotenv.config()

const githubToken: string = process.env.GITHUB_TOKEN || ''
const githubUsername = process.env.GITHUB_USERNAME as string
const githubApiUrl: string = process.env.GITHUB_API_URL || ''
const githubRepo = process.env.GITHUB_REPO as string
const githubOwner = process.env.GITHUB_OWNER as string

interface PullRequest {
  id: number
  title: string
  html_url: string
  state: string
}

const octokit = new Octokit({
  auth: githubToken,
  request: { fetch }
})

const getOpenPullRequests = async () => {
  try {
    // Using Octokit to get open pull requests
    const response = await octokit.pulls.list({
      owner: githubOwner,
      repo: githubRepo,
      state: 'open'
    })

    return response.data
  } catch (error: any) {
    console.error('Error fetching PR using Octokit:', error)
    throw error
  }
}

const GitHubService = {
  getOpenPullRequests
}

export default GitHubService
