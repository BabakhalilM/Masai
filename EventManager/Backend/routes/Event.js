import express from 'express';
import { cancel, createEvent, Events, register } from '../controllers/Eventcreation.js';
import { admin, protect } from '../middlewares/auth.js';
const Eventrouter=express.Router();

Eventrouter.post('/createevent',createEvent);
Eventrouter.get('/events',Events);
Eventrouter.post('/events/:eventId/register',register)

Eventrouter.delete('/events;:eventId/cancel',cancel);

export default Eventrouter;