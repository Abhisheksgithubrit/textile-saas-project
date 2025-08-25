// backend/src/routes/jobsRoutes.js

const { Router } = require('express');
const jobsController = require('../controllers/jobsController');

const router = Router();

// This line requires jobsController.getAllJobs to be a function
router.get('/jobs', jobsController.getAllJobs);

// This line requires jobsController.createJob to be a function
router.post('/jobs', jobsController.createJob);

module.exports = router;