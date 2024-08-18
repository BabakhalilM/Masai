import Event from "../models/EventCreation.js";
import Registration from "../models/Register.js";

export const createEvent = async (req, res) => {
    try {
        const { name, description, date, capacity, time, location } = req.body;

        // Create new event
        const newEvent = new Event({
            name,
            description,
            date,
            capacity: capacity || Infinity, // If no capacity is provided, set it to Infinity
            time,
            location,
        });

        // Save the event to the database
        const savedEvent = await newEvent.save();

        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



// routes/event.js
// const express = require('express');
// const router = express.Router();
// const Event = require('../models/Event');
// const Registration = require('../models/Registration');

// Browse Events
export const Events= async (req, res) => {
  try {
    const userId = req.body.userId; // Get userId from query params or auth token
    
    // Fetch all events
    const events = await Event.find().lean();

    // Fetch registrations for the current user
    const registrations = await Registration.find({ user: userId });
    const registeredEventIds = registrations.map(reg => reg.event.toString());

    // Add an isRegistered flag to each event
    events.forEach(event => {
      event.isRegistered = registeredEventIds.includes(event._id.toString());
    });

    // Send the events to the frontend
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// Register for Event
export const register= async (req, res) => {
  try {
    const { userId } = req.body; // Get userId from the request (likely from session or token)
    const event = await Event.findById(req.params.eventId);

    if (event.participants.length < event.capacity) {
      event.participants.push(userId);
      await event.save();

      const registration = await Registration.create({
        user: userId,
        event: event._id,
        status: 'registered',
      });

      res.status(200).json({ message: 'Successfully registered', registration });
    } else {
      event.waitlist.push(userId);
      await event.save();

      const registration = await Registration.create({
        user: userId,
        event: event._id,
        status: 'waitlisted',
      });

      res.status(200).json({ message: 'Added to waitlist', registration });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to register for event' });
  }
};

// Cancel Registration
export const cancel= async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.eventId);

    const registration = await Registration.findOneAndDelete({ user: userId, event: event._id });
    if (!registration) {
      return res.status(400).json({ message: 'Registration not found' });
    }

    if (registration.status === 'registered') {
      event.participants.pull(userId);
      if (event.waitlist.length > 0) {
        const nextUser = event.waitlist.shift();
        event.participants.push(nextUser);

        await Registration.findOneAndUpdate(
          { user: nextUser, event: event._id },
          { status: 'registered' }
        );
      }
    } else if (registration.status === 'waitlisted') {
      event.waitlist.pull(userId);
    }

    await event.save();
    res.status(200).json({ message: 'Registration cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to cancel registration' });
  }
};


