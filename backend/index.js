const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jobRoutes = require('./src/routes/jobsRoutes');
const applicationRoutes = require('./src/routes/applicationsRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// --- IMPORTANT: CORS Configuration ---
// This creates a "whitelist" of domains that are allowed to access your API
const allowedOrigins = [
    'https://textile-saas-project.vercel.app/' // <-- PASTE YOUR VERCEL URL HERE
    // You can add your other preview URLs from Vercel here if needed
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
};

// --- Middleware ---
app.use(cors(corsOptions)); // <-- Use the configured options
app.use(express.json());


// --- API Routes ---
app.use('/api', jobRoutes);
app.use('/api', applicationRoutes);