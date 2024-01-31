// mockData.ts
import { Calendar, CalendarEvent } from '../services/googleService' // Adjust the import path as necessary

export const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    calendarId: 'primary',
    status: 'confirmed',
    created: '2024-01-01T00:00:00Z',
    updated: '2024-01-02T00:00:00Z',
    summary: 'New Year Celebration',
    description: 'Celebrating the new year with friends and family',
    start: { dateTime: '2024-01-01T20:00:00Z' },
    end: { dateTime: '2024-01-01T23:30:00Z' }
  },
  {
    id: '2',
    calendarId: 'work',
    status: 'confirmed',
    created: '2024-01-04T00:00:00Z',
    updated: '2024-01-05T00:00:00Z',
    summary: 'Work Meeting',
    description: 'Discuss project updates',
    start: { dateTime: '2024-01-06T09:00:00Z' },
    end: { dateTime: '2024-01-06T10:00:00Z' }
  },
  {
    id: '3',
    calendarId: 'primary',
    status: 'confirmed',
    created: '2024-01-07T00:00:00Z',
    updated: '2024-01-08T00:00:00Z',
    summary: 'Doctor Appointment',
    description: 'Annual health check-up',
    start: { dateTime: '2024-01-10T15:00:00Z' },
    end: { dateTime: '2024-01-10T16:00:00Z' }
  },
  {
    id: '4',
    calendarId: 'family',
    status: 'confirmed',
    created: '2024-01-09T00:00:00Z',
    updated: '2024-01-10T00:00:00Z',
    summary: 'Family Dinner',
    description: "Dinner at grandma's house",
    start: { dateTime: '2024-01-15T19:00:00Z' },
    end: { dateTime: '2024-01-15T21:00:00Z' }
  },
  {
    id: '5',
    calendarId: 'work',
    status: 'tentative',
    created: '2024-01-11T00:00:00Z',
    updated: '2024-01-12T00:00:00Z',
    summary: 'Client Presentation',
    description: 'Presenting quarterly results to clients',
    start: { dateTime: '2024-01-20T13:00:00Z' },
    end: { dateTime: '2024-01-20T14:30:00Z' }
  }
  // Additional events can be added as needed
]

export const mockCalendars: Calendar[] = [
  {
    id: 'primary',
    summary: 'Primary Calendar',
    timeZone: 'America/Los_Angeles',
    description: 'This is a mock primary calendar'
  },
  {
    id: 'work',
    summary: 'Work Calendar',
    timeZone: 'America/New_York',
    description: 'This is a mock work calendar'
  },
  {
    id: 'family',
    summary: 'Family Calendar',
    timeZone: 'America/Chicago',
    description: 'This is a mock family calendar'
  }
  // Additional calendars can be added as needed
]
