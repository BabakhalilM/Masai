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

// Browse Events

export const Events = async (req, res) => {
  try {
    const userId = req.query.user; // Get userId from query params or auth token
    const searchQuery = req.query.searchQuery || ''; // Get search query from query params

    // Fetch events with search query filtering
    const events = await Event.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search
        { location: { $regex: searchQuery, $options: 'i' } }
      ]
    }).lean();

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
    const { user } = req.body; // Get userId from the request (likely from session or token)
    const event = await Event.findById(req.params.eventId);

    if (event.participants.length < event.capacity) {
      event.participants.push(user);
      await event.save();

      const registration = await Registration.create({
        user: user,
        event: event._id,
        status: 'registered',
      });

      res.status(200).json({ message: 'Successfully registered', registration });
    } else {
      event.waitlist.push(user);
      await event.save();

      const registration = await Registration.create({
        user: user,
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
export const cancel = async (req, res) => {
  try {
    const { user } = req.body;
    const userId = user;
    const event = await Event.findById(req.params.eventId);

    console.log('Fetched Event:', event);

    const registration = await Registration.findOneAndDelete({ user: userId, event: event._id });
    if (!registration) {
      return res.status(400).json({ message: 'Registration not found' });
    }

    console.log('Registration:', registration);

    if (registration.status === 'registered') {
      event.participants.pull(userId);
      console.log('Participants after pull:', event.participants);

      if (event.waitlist.length > 0) {
        const nextUser = event.waitlist.shift();
        event.participants.push(nextUser);

        console.log('Next user from waitlist:', nextUser);

        await Registration.findOneAndUpdate(
          { user: nextUser, event: event._id },
          { status: 'registered' }
        );
      }
    } else if (registration.status === 'waitlisted') {
      event.waitlist.pull(userId);
      console.log('Waitlist after pull:', event.waitlist);
    }

    await event.save();
    console.log('Event saved:', event);

    res.status(200).json({ message: 'Registration cancelled' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Failed to cancel registration' });
  }
};


// import Event from './models/Event.js'; // Make sure to adjust the import path

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Event ID is required' });
    }
    console.log("event id",id);
    // Find the event by ID
    const event = await Event.findById(id).lean();

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Send the event details to the frontend
    res.status(200).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
};
// import Event from './models/Event.js'; // Make sure to adjust the import path

export const editEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEventData = req.body;

    // Find the event by ID and update it with the new data
    const updatedEvent = await Event.findByIdAndUpdate(id, updatedEventData, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Send the updated event details to the frontend
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update event' });
  }
};
