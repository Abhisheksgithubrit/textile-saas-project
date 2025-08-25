// frontend/app/components/JobList.js

'use client'; 

import { useState, useEffect } from 'react';

// --- IMPORTANT: Define the live backend URL here ---
const API_BASE_URL = 'https://textile-saas-project.onrender.com';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(''); // State for success/error messages

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      // --- UPDATED LINE ---
      const response = await fetch(`${API_BASE_URL}/api/jobs`); 
      if (!response.ok) {
        throw new Error('Data could not be fetched!');
      }
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // --- THIS IS THE FUNCTION FOR THE "APPLY NOW" BUTTON ---
  const handleApply = async (jobId) => {
    // In a real app, you would get the gig_worker_id from a logged-in user.
    // We will hardcode it to 1 for this prototype.
    const applicationData = {
      job_id: jobId,
      gig_worker_id: 1, 
    };

    setNotification('Submitting application...'); // Give user feedback

    try {
      // --- UPDATED LINE ---
      const response = await fetch(`${API_BASE_URL}/api/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Use the error message from the backend
        throw new Error(result.error || 'Failed to submit application.');
      }
      
      setNotification('Successfully applied for the job!');

    } catch (error) {
      console.error('Application Error:', error);
      setNotification(`Error: ${error.message}`);
    }
  };
  
  if (isLoading) return <p>Loading available jobs...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Available Jobs</h2>
      {/* Display a notification message if there is one */}
      {notification && <p>{notification}</p>}

      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id} style={{ border: '1px solid #ccc', borderRadius: '8px', margin: '16px 0', padding: '16px' }}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>
              <strong>Workers Needed:</strong> {job.required_workers} | <strong>Pay:</strong> ₹{job.pay_per_day}/day
            </p>
            {/* --- THIS BUTTON NOW CALLS handleApply --- */}
            <button 
              onClick={() => handleApply(job.id)} 
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              Apply Now
            </button>
          </div>
        ))
      ) : (
        <p>No open jobs found at the moment.</p>
      )}
    </div>
  );
}