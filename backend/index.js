const express = require('express');
const cors = require('cors');
require('dotenv').config();

const jobRoutes = require('./src/routes/jobsRoutes');
const applicationRoutes = require('./src/routes/applicationsRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api', jobRoutes);
app.use('/api', applicationRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running successfully on port ${PORT}`);
});