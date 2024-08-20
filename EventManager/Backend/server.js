import express from 'express';
import {} from 'dotenv/config';
import cors from 'cors';
import loginRouter from './routes/Login.js';
import connectDB from './config/db.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import Eventrouter from './routes/Event.js';

const app = express();

// Load the MongoDB URL from environment variables
const mongoUrl = process.env.mongo_url;

// Set up session middleware with MongoStore
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl }), // Corrected variable name
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Only secure cookies in production
        sameSite: 'Strict'
    }
}));

// Set up CORS
app.use(cors({
  // origin: 'http://localhost:5173', // Set the URL of your frontend application
    origin:'https://event-manager-frontend-7jnp.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Enable cookies and sessions to be sent cross-origin
}));

// Other middleware
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use('/api', loginRouter);
app.use('/api', Eventrouter);

app.use('/', (req, res) => {
    res.send("This is the home route");
});

// Start server
const PORT = process.env.PORT || 3200;
app.listen(PORT, async () => {
    try {
        await connectDB(); // Ensure the database is connected before starting the server
        console.log('MongoDB connected');
        console.log(`Server is running at ${PORT}`);
    } catch (err) {
        console.log("Error in connecting to MongoDB:", err);
    }
});
