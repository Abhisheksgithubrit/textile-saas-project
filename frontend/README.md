# Textile Industry Mini Marketplace (SaaS Prototype)

A full-stack web application designed to connect textile manufacturers with gig workers. This project serves as a technical prototype demonstrating database design, backend API logic, frontend user interface development, and integration with third-party services.

**Live Demo:** **[Deployed Frontend Link]**
**GitHub Repository:** **[GitHub Repo Link]**

---

## 🚀 Key Features

*   **Dual User Profiles:** Separate profile creation and management for both Manufacturers and Gig Workers.
*   **Job Posting:** Manufacturers can post new job opportunities with details like title, description, required workers, and pay.
*   **Job Browsing:** Gig workers can view a live list of all available jobs.
*   **Job Application:** A simple one-click application process for gig workers.
*   **Real-time WhatsApp Notifications:** When a gig worker applies for a job, the manufacturer instantly receives a WhatsApp notification via the Twilio API.

---

## 🛠️ Tech Stack

*   **Frontend:** [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
*   **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/)
*   **External API:** [Twilio WhatsApp API](https://www.twilio.com/whatsapp)
*   **Styling:** Inline CSS & `globals.css` (focus on functionality)

---

## 📂 Project Structure

This project uses a monorepo structure to keep the frontend and backend code separate but within the same repository.

```
textile-marketplace/
├── backend/      # Node.js, Express, PostgreSQL logic
└── frontend/     # Next.js, React UI
```

---

## 🏁 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

You must have the following software installed:
*   [Node.js](https://nodejs.org/en/download/) (v18 or later recommended)
*   [PostgreSQL](https://www.postgresql.org/download/)

### 1. Backend Setup

First, let's get the server and database running.

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create the environment variables file
# Create a new file named '.env' in the 'backend' directory.
# Copy the content from '.env.example' below and fill in your credentials.
```

**`.env.example` file for the backend:**
```.env
# PostgreSQL Database Credentials
DB_USER=your_postgres_user
DB_HOST=localhost
DB_DATABASE=knitnexus_db # Or your chosen DB name
DB_PASSWORD=your_postgres_password
DB_PORT=5432

# Server Port
PORT=5001

# Twilio Credentials
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

**Database Schema Setup:**
1.  Create a new PostgreSQL database (e.g., `knitnexus_db`).
2.  Connect to your database using a tool like `psql` or `pgAdmin`.
3.  Run the following SQL script to create all the necessary tables:

<details>
<summary>Click to expand SQL Schema</summary>

```sql
-- Create the manufacturers table
CREATE TABLE manufacturers (
    id SERIAL PRIMARY KEY,
    factory_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    location TEXT,
    machinery_details TEXT,
    daily_production_capacity INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the gig_workers table
CREATE TABLE gig_workers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    skills TEXT[],
    work_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the jobs table
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    required_workers INTEGER NOT NULL,
    duration_days INTEGER,
    pay_per_day NUMERIC(10, 2),
    status VARCHAR(50) DEFAULT 'open',
    manufacturer_id INTEGER NOT NULL REFERENCES manufacturers(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the job_applications table
CREATE TABLE job_applications (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) DEFAULT 'pending',
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    gig_worker_id INTEGER NOT NULL REFERENCES gig_workers(id) ON DELETE CASCADE,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(job_id, gig_worker_id)
);

-- Insert sample data to get started
INSERT INTO manufacturers (id, factory_name, phone_number, location) VALUES (1, 'ABC Textiles', '+91xxxxxxxxxx', 'Coimbatore') ON CONFLICT (id) DO NOTHING;
INSERT INTO gig_workers (id, full_name, skills) VALUES (1, 'Test Worker', '{"stitching"}') ON CONFLICT (id) DO NOTHING;
```
</details>

```bash
# 4. Run the backend server
node index.js
# The server should now be running on http://localhost:5001
```

### 2. Frontend Setup

Now, set up the user interface in a separate terminal.

```bash
# 1. Navigate to the frontend directory from the root
cd frontend

# 2. Install dependencies
npm install

# 3. Run the frontend development server
npm run dev
# The app should now be running on http://localhost:3000
```

---

## 🕹️ Usage

*   Open **`http://localhost:3000`** to view the job listings.
*   Navigate to **`http://localhost:3000/post-a-job`** to post a new job as a manufacturer.
*   Click the "Apply Now" button on any job to test the application and WhatsApp notification flow.

---

