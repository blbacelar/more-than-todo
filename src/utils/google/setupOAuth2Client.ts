import { readFile } from 'fs'
import { OAuth2Client } from 'google-auth-library'
import { google } from 'googleapis'
import { loadClientSecrets } from './clientSecrets' // Adjust the import path as necessary

const TOKEN_PATH = 'token.json' // Path to your saved token file (contains access_token and refresh_token)

async function setupOAuth2Client(): Promise<OAuth2Client> {
  // Load client secrets from a local file.
  const secrets = await loadClientSecrets('credentials.json') // Adjust path to your credentials file
  const { client_secret, client_id, redirect_uris } = secrets.installed

  // Create the OAuth2 client with the given credentials
  const oauth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  // Check if we have previously stored a token.
  try {
    const token = await readFile(TOKEN_PATH, 'utf8')
    oauth2Client.setCredentials(JSON.parse(token))
  } catch (error) {
    console.error('Error loading the token file, please authenticate:', error)
    // Here you would typically trigger the authentication flow,
    // For example, by calling a function that handles the OAuth2 consent flow
    // and then saves the new token to TOKEN_PATH.
    throw new Error('Authentication required')
  }

  return oauth2Client
}

export { setupOAuth2Client }
