const cors = require('cors')
import express, { NextFunction, Request, Response } from 'express'
import githubRoutes from './routes/githubRoutes'
import ticketRoutes from './routes/ticketRoutes'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Express on Vercel')
})

app.use('/tickets', ticketRoutes)
app.use('/github', githubRoutes)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.status(500).send('Internal Server Error')
})

export default app
