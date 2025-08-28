// backend/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jobRoutes = require('./src/routes/jobsRoutes');
const applicationRoutes = require('./src/routes/applicationsRoutes');

const app = express();
// Render sets its own PORT, so we don't need a fallback for production
const PORT = process.env.PORT; 

// --- CORS Configuration ---
const allowedOrigins = [
    'https://textile-saas-project.vercel.app/' // Your live Vercel URL
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests from the whitelist
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // Block requests from other origins
            callback(new Error('This origin is not allowed by CORS'));
        }
    }
};

// --- Middleware ---
app.use(cors(corsOptions));
app.use(express.json());


// --- API Routes ---
app.use('/api', jobRoutes);
app.use('/api', applicationRoutes);


// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`✅ Server is running successfully on port ${PORT}`);
});