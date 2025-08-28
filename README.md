# Textile Industry Mini Marketplace (SaaS Prototype)

A full-stack web application built to connect textile manufacturers with gig workers, featuring real-time job application notifications via WhatsApp. This project demonstrates a complete development and deployment pipeline, from database design to a live, publicly accessible application.

---

## 🚀 Live Demo & Links

The application is fully deployed and accessible at the following URLs:

*   **View Jobs (Homepage):** **[https://textile-saas-project.vercel.app](https://textile-saas-project.vercel.app/)**
*   **Post a New Job Page:** **[https://textile-saas-project.vercel.app/post-a-job](https://textile-saas-project.vercel.app/post-a-job)**

---

## ✨ Key Features

*   **Dual User Roles:** Separate functionality for Manufacturers (posting jobs) and Gig Workers (browsing and applying).
*   **Dynamic Job Board:** A live-updating list of available jobs fetched from the backend.
*   **Job Creation:** A dedicated form for manufacturers to post new opportunities to the marketplace.
*   **Real-time WhatsApp Notifications:** The core feature of the project. When a gig worker applies for a job, the manufacturer is instantly notified on WhatsApp via the Twilio API.
*   **Full-Stack Deployment:** The frontend is deployed on Vercel, with the backend server and PostgreSQL database hosted on Render.

---

## 🛠️ Tech Stack

*   **Frontend:** Next.js, React
*   **Backend:** Node.js, Express.js
*   **Database:** PostgreSQL
*   **External API:** Twilio WhatsApp API
*   **Deployment:** Vercel (Frontend), Render (Backend & Database)

---

## 📂 Project Structure

This project uses a monorepo structure to keep the frontend and backend code organized and independent.

```
textile-marketplace/
├── backend/      # Contains the Node.js API, database logic, and routes
└── frontend/     # Contains the Next.js UI, pages, and components
```

---

## 🏁 Getting Started Locally

To run this project on your own machine, follow these steps.

### Prerequisites

*   [Node.js](https://nodejs.org/en/download/) (v18 or later)
*   [PostgreSQL](https://www.postgresql.org/download/)
*   A free [Twilio Account](https://www.twilio.com/try-twilio) with a configured WhatsApp Sandbox.

### 1. Backend Setup

First, configure and run the backend server.

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create the environment variables file
# Create a new file named '.env' in the 'backend' directory.
# Copy the content from the example below and fill in your own credentials.
```

**Example `backend/.env` file:**
```.env
# PostgreSQL Database Credentials
DB_USER=your_postgres_user
DB_HOST=localhost
DB_DATABASE=your_local_db_name
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
1.  Create a new PostgreSQL database locally.
2.  Connect to it using `pgAdmin` or `psql`.
3.  Run the SQL script below to create the necessary tables and sample data.

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
-- IMPORTANT: Replace the phone number with a number verified in your Twilio Sandbox
INSERT INTO manufacturers (id, factory_name, phone_number, location) VALUES (1, 'Local Test Factory', '+91xxxxxxxxxx', 'Local City') ON CONFLICT (id) DO NOTHING;
INSERT INTO gig_workers (id, full_name, skills) VALUES (1, 'Local Test Worker', '{"sewing"}') ON CONFLICT (id) DO NOTHING;
```
</details>

```bash
# 4. Run the backend server
node index.js
# The server will start on http://localhost:5001
```

### 2. Frontend Setup

In a new, separate terminal, run the frontend.

```bash
# 1. Navigate to the frontend directory from the root
cd frontend

# 2. Install dependencies
npm install

# 3. Run the frontend development server
npm run dev
# The app will be available at http://localhost:3000
```

---

## ✍️ Author

*   **Abhishek N Alavandi** - **[https://github.com/Abhisheksgithubrit]**
