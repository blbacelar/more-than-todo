import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const githubToken: string = process.env.GITHUB_TOKEN || ''
const githubApiUrl: string =
  process.env.GITHUB_API_URL || 'https://api.github.com'
const githubRepo = process.env.GITHUB_REPO as string
const githubOwner = process.env.GITHUB_OWNER as string

interface PullRequest {
  html_url: string
  state: string
  title: string
  created_at: string
  updated_at: string
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
