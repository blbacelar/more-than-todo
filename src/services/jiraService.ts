import axios, { AxiosResponse } from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const jiraApiToken: string = process.env.JIRA_API_TOKEN || ''
const jiraUserEmail: string = process.env.JIRA_USER_EMAIL || ''
const jiraBaseUrl: string = process.env.JIRA_BASE_URL || ''

interface Issue {
  id: string
  key: string
  summary: string
  statusCode: string
  statusName: string
}

const getAccountIdByEmail = async (email: string): Promise<string> => {
  const response: AxiosResponse = await axios.get(
    `${jiraBaseUrl}/rest/api/3/user/search?query=${email}`,
    {
      auth: {
        username: jiraUserEmail,
        password: jiraApiToken
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (response.data && response.data.length > 0) {
    // Assuming the first result is the correct user
    return response.data[0].accountId
  } else {
    throw new Error('User not found')
  }
}

const getAssignedTickets = async (): Promise<Issue[]> => {
  try {
    const response: AxiosResponse = await axios.get(
      `${jiraBaseUrl}/rest/api/3/search?jql=assignee='${jiraUserEmail}' AND statusCategory != "Done"`,
      {
        auth: {
          username: jiraUserEmail,
          password: jiraApiToken
        },
        headers: {
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

const getTicketsWithUserComments = async (): Promise<Issue[]> => {
  try {
    // Fetch the accountId for the user
    const accountId = await getAccountIdByEmail(jiraUserEmail)
    console.log(`ACCOUNT ID => ${accountId}`)

    // Use accountId in JQL query
    const response: AxiosResponse = await axios.get(
      `${jiraBaseUrl}/rest/api/3/search?jql=comment ~ accountId:${accountId} AND statusCategory != "Done" ORDER BY created DESC`,
      {
        auth: {
          username: jiraUserEmail,
          password: jiraApiToken
        },
        headers: {
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
  getAssignedTickets,
  getTicketsWithUserComments
}

export default JiraService
