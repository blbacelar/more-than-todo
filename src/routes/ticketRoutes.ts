import express from 'express'
import TicketController from '../controllers/ticketControllers'

const router = express.Router()

router.get('/assigned', TicketController.getAssignedTickets)

export default router
