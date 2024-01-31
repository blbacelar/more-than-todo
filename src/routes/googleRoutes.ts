import express from 'express'
import GoogleCalendarController from '../controllers/googleController'
import GoogleCalendarService from '../services/googleService'
const { oAuth2Client } = GoogleCalendarService

const router = express.Router()

// Define routes for Google Calendar functionalities
router.get('/upcoming-events', GoogleCalendarController.getUpcomingEvents)
router.get('/calendars', GoogleCalendarController.getListOfCalendars)
router.get('/auth', (req, res) => {
  const url = GoogleCalendarService.generateAuthUrl()
  res.redirect(url)
})

router.get('/oauth2callback', async (req, res) => {
  const code = req.query.code as string
  if (!code) {
    return res.status(400).send('Authorization code is required')
  }
  try {
    const { tokens } = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(tokens)
    res.redirect('/') // Redirect or handle the token storage as needed
  } catch (error) {
    console.error('Error retrieving access token', error)
    res.status(500).send('Internal Server Error during OAuth')
  }
})

export default router
