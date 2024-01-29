import axios, { AxiosResponse } from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const jiraApiToken: string = process.env.JIRA_API_TOKEN || ''
const jiraUserEmail: string = process.env.JIRA_USER_EMAIL || ''
const jiraBaseUrl: string = process.env.JIRA_BASE_URL || ''

const authBuffer: string = Buffer.from(
  `${jiraUserEmail}:${jiraApiToken}`
).toString('base64')

console.log(`AUTH => ${authBuffer}`)

interface Issue {
  id: string
  key: string
  summary: string
  statusCode: string
  statusName: string
}

const getAssignedTickets = async (): Promise<Issue[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${jiraBaseUrl}/rest/api/3/search?jql=assignee='${jiraUserEmail}' AND statusCategory != "Done"`,
      {
        headers: {
          Authorization: `Basic ${authBuffer}`,
          'Content-Type': 'application/json'
        }
      }
    )

    const issues: Issue[] = response.data.issues.map((issue: any) => ({
      id: issue.id,
      key: issue.key,
      summary: issue.fields.summary,
      statusCode: issue.fields.status.id,
      statusName: issue.fields.status.name
    }))

    return issues
  } catch (error: any) {
    if (error.response) {
      // Log more details for better understanding
      console.error(
        'Error response:',
        error.response.status,
        error.response.data
      )
    } else {
      console.error('Error fetching tickets:', error.message)
    }
    throw error
  }
}

const JiraService = {
  getAssignedTickets
}

export default JiraService
