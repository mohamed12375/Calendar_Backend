// db/EventModel.ts

import { CalenderNotFoundException } from '../Exceptions/CalenderNotFoundException';
import { EventNotFoundException } from '../Exceptions/EventNotFoundException';
import { EventDTO } from '../models/DTOs/EventsDTO';
import { db } from '../startup/db';


export interface calendar_Event {
  id?: number;
  name: string;
  details: string;
  fromDate: Date;
  toDate: Date;
  calendarId: number;
  userId?: number;
  sharedWith: string[];
}

class EventModel {
  static async createEvent(event: calendar_Event, userId: any): Promise<calendar_Event> {
    // Retrieve the calendarId for the given userId
    const [calendar] = await db('calendars')
    .select('id')
    .where({ userId: userId });
    if (!calendar) {
      throw new CalenderNotFoundException('Calendar not found for the given user.');
    }

    // Populate the calendarId and userId in the event
    event.calendarId = calendar.id;
    event.userId = userId;

    // Insert the event into the database
    const [newEvent] = await db('events').insert(event).returning('*');
    return newEvent;
  }

  static async deleteEvent(eventId: number, userId: any): Promise<void> {
    // Retrieve the calendarId for the given userId
    const [calendar] = await db('calendars')
      .select('id')
      .where({ userId: userId });
      console.log(calendar)

    if (!calendar) {
      throw new CalenderNotFoundException('Calendar not found for the given user.');
    }

    // Retrieve the event to ensure it exists and belongs to the user's calendar
    const [event] = await db('events')
      .select('*')
      .where({ id: eventId, calendarId: calendar.id });

    if (!event) {
      throw new EventNotFoundException('Event not found or does not belong to the user.');
    }

    // Delete the event from the database
    await db('events')
      .where({ id: eventId })
      .del();
  }

  static async updateEvent(eventId: number, event: Partial<calendar_Event>, userId: any): Promise<calendar_Event> {
    // Retrieve the calendarId for the given userId
    const [calendar] = await db('calendars')
      .select('id')
      .where({ userId: userId });
    if (!calendar) {
      throw new CalenderNotFoundException('Calendar not found for the given user.');
    }
  
    // Retrieve the event to ensure it exists and belongs to the user's calendar
    const [existingEvent] = await db('events')
      .select('*')
      .where({ id: eventId, calendarId: calendar.id });
  
    if (!existingEvent) {
      throw new EventNotFoundException('Event not found or does not belong to the user.');
    }
  
    // Update the event in the database
    const [updatedEvent] = await db('events')
      .where({ id: eventId })
      .update(event)
      .returning('*');
  
    return updatedEvent;
  }
  


  static async getAllEventsPaginated(
    page: number,
    pageSize: number,
    searchTerm: string,
    sortBy: string,
    isAscending: boolean,
    filterByDate: string
  ):
   Promise<any> {
    console.log(isAscending == true ? 'asc' : 'desc')
    let query = db('events').orderBy(sortBy, isAscending == true ? 'asc' : 'desc');

    if (searchTerm) {
      query = query.where('name', 'ilike', `%${searchTerm}%`)
      .orWhere('details', 'ilike', `%${searchTerm}%`);
    }

    if (filterByDate) {
      query = query.where('fromDate', filterByDate); 
    }

    const result = await query.paginate({
      perPage: pageSize,
      currentPage: page,
      isLengthAware: true,
    });

      const events = EventDTO.fromDatabaseArray(result.data);

    return {
      data: events,
      pagination: result.pagination,
    };
  }
}

export default EventModel;
