// backend/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jobRoutes = require('./src/routes/jobsRoutes');
const applicationRoutes = require('./src/routes/applicationsRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// --- FINAL CORS Configuration ---
// This list MUST contain all the domains your frontend is served from.
const allowedOrigins = [
    'https://textile-saas-project.vercel.app',
    'https://textile-saas-project-git-main-abhishek-n-alavandis-projects.vercel.app',
    'https://textile-saas-project-hxd6itqkw-abhishek-n-alavandis-projects.vercel.app'
    
    // Add any other domains from your Vercel "Domains" page here if you have them
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests that are in our whitelist
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // Block all other requests
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