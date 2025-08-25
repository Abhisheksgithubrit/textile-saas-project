// backend/src/routes/applicationsRoutes.js

const { Router } = require('express');
const applicationsController = require('../controllers/applicationsController');

const router = Router();

// Route to handle a new job application
// POST http://localhost:5001/api/applications
router.post('/applications', applicationsController.applyForJob);

module.exports = router;