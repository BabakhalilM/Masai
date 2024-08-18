import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    waitlist: [{ type: String }], // Array of emails
    participants: [{ type: String }], // Array of emails
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
