import dotenv from 'dotenv'
import { OAuth2Client } from 'google-auth-library'
import { mockCalendars, mockEvents } from '../data/mockData'

dotenv.config()

const googleClientId: string = process.env.GOOGLE_CLIENT_ID || ''
const googleClientSecret: string = process.env.GOOGLE_CLIENT_SECRET || ''
const googleRedirectUri: string = process.env.GOOGLE_REDIRECT_URI || ''

const oAuth2Client: OAuth2Client = new OAuth2Client(
  googleClientId,
  googleClientSecret,
  googleRedirectUri
)

// Define the type for the token
interface Token {
  access_token?: string | null // Allow null
  refresh_token?: string | null // Allow null
  scope?: string | null // Allow null
  token_type?: string | null // Allow null
  expiry_date?: number | null // Allow null
}

// Function to set credentials for OAuth2Client
// const setCredentials = (token: Token): void => {
//   oAuth2Client.setCredentials(token)
// }

// Define types for Google Calendar events and calendars
export interface CalendarEvent {
  calendarId: string
  id: string
  status: string
  created: string
  updated: string
  summary: string
  description: string
  start: {
    dateTime: string
  }
  end: {
    dateTime: string
  }
}

export interface Calendar {
  id: string
  summary: string
  timeZone: string
  description: string
}

// async function refreshTokenIfNeeded() {
//   const now = new Date().getTime()
//   // Check if the expiry_date is not set or if the token is expired
//   if (
//     !oAuth2Client.credentials.expiry_date ||
//     oAuth2Client.credentials.expiry_date < now
//   ) {
//     try {
//       const { credentials } = await oAuth2Client.refreshAccessToken()
//       setCredentials(credentials) // Update the credentials with the new access token
//       // Optionally, update the environment variable or secure storage with the new tokens
//     } catch (error) {
//       console.error('Error refreshing access token:', error)
//       throw error // Handle the error appropriately
//     }
//   }
// }

// Function to get list of upcoming events
const getUpcomingEvents = async (): Promise<CalendarEvent[]> => {
  try {
    // console.log(`AUTH => Bearer ${oAuth2Client.credentials.access_token}`)
    // const url: string =
    //   'https://www.googleapis.com/calendar/v3/calendars/primary/events'
    // const response: AxiosResponse = await axios.get(url, {
    //   headers: {
    //     Authorization: `Bearer ya29.a0AfB_byAIHHB7upjZB9vU5FFZ5uDXLZYBx9lkSJVWQkW5c3vyRcwzrs12JxPacD3DQoUyVZlXuDEgYb2xFj0YrJ86hfcQDRSYsLTZcjQzle65o2nqwF0Gbe32xqSlBsLPfAbM4SH0Xj5iQR9rxNFRFg7TC0W0FE3n4dAuaCgYKAfcSARASFQHGX2MiONCGi9sdIAaMK1UMy6APSw0171`
    //   }
    // })
    return mockEvents // List of upcoming events
  } catch (error: any) {
    console.error('Error fetching upcoming events:', error.message)
    throw error
  }
}

// Function to get list of calendars shared with you
const getListOfCalendars = async (): Promise<Calendar[]> => {
  try {
    // const url: string =
    //   'https://www.googleapis.com/calendar/v3/users/me/calendarList'
    // const response: AxiosResponse = await axios.get(url, {
    //   headers: {
    //     Authorization: `Bearer ya29.a0AfB_byAIHHB7upjZB9vU5FFZ5uDXLZYBx9lkSJVWQkW5c3vyRcwzrs12JxPacD3DQoUyVZlXuDEgYb2xFj0YrJ86hfcQDRSYsLTZcjQzle65o2nqwF0Gbe32xqSlBsLPfAbM4SH0Xj5iQR9rxNFRFg7TC0W0FE3n4dAuaCgYKAfcSARASFQHGX2MiONCGi9sdIAaMK1UMy6APSw0171`
    //   }
    // })
    return mockCalendars
  } catch (error: any) {
    console.error('Error fetching list of calendars:', error.message)
    throw error
  }
}

const generateAuthUrl = (): string => {
  const SCOPES = ['https://www.googleapis.com/auth/calendar']
  return oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent' // Ensure users are prompted so you can get a refresh token
  })
}

const GoogleCalendarService = {
  getUpcomingEvents,
  getListOfCalendars,
  oAuth2Client,
  generateAuthUrl
}

export default GoogleCalendarService
