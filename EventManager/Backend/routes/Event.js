import express from 'express';
import { cancel, createEvent, editEvent, Events, getEventById, register } from '../controllers/Eventcreation.js';
import { admin, protect } from '../middlewares/auth.js';
const Eventrouter=express.Router();

Eventrouter.post('/createevent',createEvent);
Eventrouter.get('/events',Events);
Eventrouter.post('/events/:eventId/register',register)

Eventrouter.delete('/events/:eventId/cancel',cancel);

Eventrouter.get('/edit-event/:id', getEventById);

// Route to edit an event by ID
Eventrouter.put('/events/:id', editEvent);
export default Eventrouter;