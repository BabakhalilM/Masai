import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
    user: {
        type: String, // Change this from ObjectId to String
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    status: {
        type: String,
        enum: ['registered', 'waitlisted'],
        required: true,
    },
});

const Registration = mongoose.model('Registration', RegistrationSchema);
export default Registration;
