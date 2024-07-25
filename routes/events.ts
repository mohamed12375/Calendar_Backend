// routes/events.js

const express = require('express');
const router = express.Router();
import Joi from 'joi';
import EventModel, { calendar_Event } from '../managers/events_manager';
import { ValidationException } from '../Exceptions/ValidationException';
import { CreateEventRequest } from '../models/CreateEventRequest';

// Route to create an event
router.post('/create', async (req: {
  user: any; body: any; 
}, res: any) => {
  
    
    const createEventRequest = new CreateEventRequest(
      req.body.name,
      req.body.details,
      req.body.fromDate,
      req.body.toDate
    );
   
    const { error } = CreateEventRequest.validate(createEventRequest);
    if (error)  throw new ValidationException(error.details[0].message);

    const event :calendar_Event = req.body;
    const newEvent = await EventModel.createEvent(event, req.user);
    res.status(201).json(newEvent);
  
});

router.put('/:eventId', async (req: { params: { eventId: string; }; body: { name: any; details: any; fromDate: any; toDate: any; }; user: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: calendar_Event): void; new(): any; }; }; }) => {
    const eventId = parseInt(req.params.eventId, 10);
    if (isNaN(eventId)) {
      throw new ValidationException('Invalid event ID');
    }

    const updateEventRequest = new CreateEventRequest(
      req.body.name,
      req.body.details,
      req.body.fromDate,
      req.body.toDate
    );

    const { error } = CreateEventRequest.validate(updateEventRequest);
    if (error) throw new ValidationException(error.details[0].message);

    const updatedEvent = await EventModel.updateEvent(eventId, updateEventRequest, req.user);
    res.status(200).json(updatedEvent);
  
});


// Delete Event Route
router.delete('/:eventId', async (req: { params: { eventId: string; }; user: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (): void; new(): any; }; }; }) => {
    const eventId = parseInt(req.params.eventId, 10);
    if (isNaN(eventId)) {
      throw new ValidationException('Invalid event ID');
    }

    await EventModel.deleteEvent(eventId, req.user);
    res.status(204).send();
  
});

// Route to get all events paginated by date
router.get('/events', async (req: { query: { page?: 1 | undefined; pageSize?: 10 | undefined; searchTerm?: string;
   sortBy?: string; isAscending?: boolean; filterByDate?: string  }; }, 
   res: { json: (arg0: any) => void; status: (arg0: number) => { (): any; new(): any; 
    json: { (arg0: { error: string; }): void; new(): any; }; }; }) => {

      const { page = 1, pageSize = 10, searchTerm = '', sortBy = 'fromDate', isAscending = true, filterByDate = '' } //TODO: Fix sortBy
        = req.query;

      const events = await EventModel.getAllEventsPaginated(Number(page), Number(pageSize), searchTerm, sortBy, isAscending, filterByDate);
      res.json(events);
  
});



module.exports = router;
