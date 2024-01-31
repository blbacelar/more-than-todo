import { Request, Response } from 'express'
import GoogleCalendarService from '../services/googleService'

const getUpcomingEvents = async (req: Request, res: Response) => {
  try {
    const events = await GoogleCalendarService.getUpcomingEvents()
    if (events.length === 0) {
      return res.status(404).json({ message: 'No upcoming events found' })
    }

    const eventList = events.map(event => {
      return {
        id: event.id,
        status: event.status,
        created: event.created,
        updated: event.updated,
        summary: event.summary,
        description: event.description,
        startDateTime: event.start.dateTime,
        endDateTime: event.end.dateTime
      }
    })

    return res.status(200).json(eventList)
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return res
        .status(404)
        .json({ message: 'Google Calendar resource not found' })
    }
    return res.status(500).json({ message: error.message })
  }
}

const getListOfCalendars = async (req: Request, res: Response) => {
  try {
    const calendars = await GoogleCalendarService.getListOfCalendars()
    if (calendars.length === 0) {
      return res.status(404).json({ message: 'No calendars found' })
    }

    const calendarList = calendars.map(calendar => {
      return {
        id: calendar.id,
        summary: calendar.summary,
        timeZone: calendar.timeZone,
        description: calendar.description
      }
    })

    return res.status(200).json(calendarList)
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return res
        .status(404)
        .json({ message: 'Google Calendar resource not found' })
    }
    return res.status(500).json({ message: error.message })
  }
}

export default {
  getUpcomingEvents,
  getListOfCalendars
}
