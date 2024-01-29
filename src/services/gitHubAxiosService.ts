import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const githubToken: string = process.env.GITHUB_TOKEN || ''
const githubApiUrl: string =
  process.env.GITHUB_API_URL || 'https://api.github.com' // Default to the official GitHub API URL if not specified
const githubRepo = process.env.GITHUB_REPO as string
const githubOwner = process.env.GITHUB_OWNER as string

// Updated PullRequest interface
interface PullRequest {
  html_url: string // PR URL
  state: string // Status
  title: string // Title
  created_at: string // Creation date
  updated_at: string // Last update date
}

const axiosInstance = axios.create({
  baseURL: githubApiUrl,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    Authorization: `token ${githubToken}`
  }
})

const getOpenPullRequests = async (): Promise<PullRequest[]> => {
  try {
    const response = await axiosInstance.get<PullRequest[]>(
      `/repos/${githubOwner}/${githubRepo}/pulls?state=open`
    )
    // Map through the response to only return the data you need if you want to trim the response
    const pullRequests = response.data.map(pr => ({
      html_url: pr.html_url,
      state: pr.state,
      title: pr.title,
      created_at: pr.created_at,
      updated_at: pr.updated_at
    }))
    return pullRequests
  } catch (error) {
    console.error('Error fetching PR using Axios:', error)
    throw error
  }
}

const GitHubAxiosService = {
  getOpenPullRequests
}

export default GitHubAxiosService
