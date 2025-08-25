// backend/src/controllers/applicationsController.js

const db = require('../db');
require('dotenv').config();

// Make sure your .env file has these variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const applyForJob = async (req, res) => {
  const { job_id, gig_worker_id } = req.body;

  if (!job_id || !gig_worker_id) {
    return res.status(400).json({ error: 'Job ID and Gig Worker ID are required.' });
  }

  try {
    // Step 1: Save the application to the database
    const applicationQuery = 'INSERT INTO job_applications(job_id, gig_worker_id, status) VALUES($1, $2, $3) RETURNING *';
    await db.query(applicationQuery, [job_id, gig_worker_id, 'pending']);
    
    // Step 2: Get job details and manufacturer phone number for the notification
    const jobInfoQuery = `
      SELECT j.title, m.factory_name, m.phone_number
      FROM jobs j
      JOIN manufacturers m ON j.manufacturer_id = m.id
      WHERE j.id = $1;
    `;
    const { rows } = await db.query(jobInfoQuery, [job_id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Job or Manufacturer not found.' });
    }
    const jobInfo = rows[0];

    // Step 3: Send the WhatsApp message using Twilio
    const messageBody = `New Application Received!\n\nFactory: ${jobInfo.factory_name}\nJob: ${jobInfo.title}\n\nA gig worker has applied for your job posting.`;
    
    await client.messages.create({
      body: messageBody,
      from: process.env.TWILIO_WHATSAPP_NUMBER, // Twilio Sandbox number
      to: `whatsapp:${jobInfo.phone_number}` // Manufacturer's number from DB
    });

    res.status(201).json({ success: true, message: 'Application submitted successfully and notification sent.' });

  } catch (error) {
    // Check for unique constraint violation (applying twice)
    if (error.code === '23505') {
      return res.status(409).json({ error: 'You have already applied for this job.' });
    }
    console.error('Error in applyForJob:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  applyForJob,
};