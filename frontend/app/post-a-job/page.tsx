// frontend/app/page.tsx

import JobList from '../components/JobList';

export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Textile Industry Marketplace</h1>
      <p>Find your next gig or the perfect worker for your factory.</p>
      <hr />
      <JobList />
    </main>
  );
}