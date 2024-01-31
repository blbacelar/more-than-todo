import express, { Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import GoogleCalendarService from '../services/googleService' // Adjust the import path as necessary

const router = express.Router()

// Assuming GoogleCalendarService exports an instance of OAuth2Client named `oAuth2Client`.
// If it exports a class or object with a different structure, adjust accordingly.
const { oAuth2Client }: { oAuth2Client: OAuth2Client } = GoogleCalendarService

router.get('/auth/google', (req: Request, res: Response) => {
  const SCOPES: string[] = ['https://www.googleapis.com/auth/calendar.readonly']
  const authUrl: string = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })
  res.redirect(authUrl)
})

router.get('/oauth2callback', async (req: Request, res: Response) => {
  const code: string | undefined = req.query.code as string | undefined
  if (code) {
    try {
      const { tokens } = await oAuth2Client.getToken(code)
      oAuth2Client.setCredentials(tokens)
      // Redirect the user or show a success message
      res.redirect('/')
    } catch (error: any) {
      console.error('Error retrieving access token', error.message)
      res.redirect('/some/error/page')
    }
  } else {
    res.redirect('/some/error/page')
  }
})

export default router
