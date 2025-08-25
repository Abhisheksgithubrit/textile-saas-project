// backend/src/controllers/jobsController.js

const db = require('../db');

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM jobs WHERE status = $1', ['open']);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Post a new job
const createJob = async (req, res) => {
  const { manufacturer_id, title, description, required_workers, duration_days, pay_per_day } = req.body;

  if (!manufacturer_id || !title || !required_workers || !pay_per_day) {
    return res.status(400).json({ error: 'Manufacturer ID, title, required workers, and pay are required fields' });
  }

  try {
    const queryText = 'INSERT INTO jobs(manufacturer_id, title, description, required_workers, duration_days, pay_per_day, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [manufacturer_id, title, description, required_workers, duration_days, pay_per_day, 'open'];
    const { rows } = await db.query(queryText, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// This is the most important part!
// Make sure you are exporting an object with the functions as properties.
module.exports = {
  getAllJobs,
  createJob,
};