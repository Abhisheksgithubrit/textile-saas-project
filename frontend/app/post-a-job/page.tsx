// frontend/app/post-a-job/page.tsx

'use client';

import React, { useState } from 'react';

// --- IMPORTANT: Define the live backend URL here ---
const API_BASE_URL = 'https://textile-saas-project.onrender.com';

// Basic styling for the form
const styles = {
  container: { maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #555', borderRadius: '8px' },
  formGroup: { marginBottom: '15px' },
  label: { display: 'block', marginBottom: '5px' },
  input: { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: '#fff' },
  button: { width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#0070f3', color: 'white', cursor: 'pointer', fontSize: '16px' },
  message: { marginTop: '15px', padding: '10px', borderRadius: '4px' }
};

export default function PostJobPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requiredWorkers, setRequiredWorkers] = useState('');
  const [payPerDay, setPayPerDay] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setMessage('');

    const jobData = {
      title,
      description,
      required_workers: parseInt(requiredWorkers, 10),
      pay_per_day: parseFloat(payPerDay),
      manufacturer_id: 1 // Hardcoding manufacturer ID 1 for now
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (!response..ok) {
        throw new Error('Failed to post job. Please check your inputs.');
      }
      
      const newJob = await response.json();
      setMessage(`Success! Job "${newJob.title}" has been posted.`);
      // Clear form
      setTitle('');
      setDescription('');
      setRequiredWorkers('');
      setPayPerDay('');

    } catch (error) { // This block is corrected for TypeScript
      setIsError(true);
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1>Post a New Job</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>Job Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{...styles.input, height: '100px'}} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="workers" style={styles.label}>Workers Needed</label>
          <input type="number" id="workers" value={requiredWorkers} onChange={(e) => setRequiredWorkers(e.target.value)} required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="pay" style={styles.label}>Pay per Day (₹)</label>
          <input type="number" id="pay" value={payPerDay} onChange={(e) => setPayPerDay(e.target.value)} required style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Post Job</button>
      </form>
      {message && (
        <div style={{...styles.message, backgroundColor: isError ? '#800' : '#050', color: 'white'}}>
          {message}
        </div>
      )}
    </div>
  );
}