import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const githubToken: string = process.env.GITHUB_TOKEN || ''
const githubApiUrl: string =
  process.env.GITHUB_API_URL || 'https://api.github.com'
const githubRepo = process.env.GITHUB_REPO as string
const githubOwner = process.env.GITHUB_OWNER as string

const MOCK_DATA: PullRequest[] = [
  {
    id: '1',
    url: 'https://github.com/mock-user/mock-repo/pull/1',
    state: 'open',
    title: 'Mock PR Title 1',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    url: 'https://github.com/mock-user/mock-repo/pull/2',
    state: 'open',
    title: 'Mock PR Title 2',
    created_at: '2023-02-01T00:00:00Z',
    updated_at: '2023-02-01T00:00:00Z'
  }
]

interface PullRequest {
  id: string
  url: string
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

export const getOpenPR = async (): Promise<PullRequest[]> => {
  return MOCK_DATA
  try {
    const response = await axiosInstance.get<PullRequest[]>(
      `/repos/${githubOwner}/${githubRepo}/pulls?state=open`
    )

    const pullRequests = response.data.map(pr => ({
      id: pr.id,
      url: pr.url,
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
