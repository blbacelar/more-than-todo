import { readFile } from 'fs/promises'
import { ClientSecrets } from './clientSecretInterface'

const loadClientSecrets = async (filePath: string): Promise<ClientSecrets> => {
  try {
    const fileContent = await readFile(filePath, 'utf8')
    const secrets: ClientSecrets = JSON.parse(fileContent)
    return secrets
  } catch (error) {
    console.error('Error reading client secrets file:', error)
    throw new Error('Failed to load client secrets')
  }
}

export { loadClientSecrets }
