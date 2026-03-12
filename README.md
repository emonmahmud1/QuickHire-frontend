# QuickHire - Frontend

QuickHire is a job listing platform where employers can post jobs and job seekers can browse and apply for them. This is the frontend of the application, built with Next.js.

---

## What this project does

- Shows available job listings on the home page
- Lets job seekers search and filter jobs by category or location
- Lets job seekers apply for a job directly from the job details page
- Lets registered users log in and post their own job listings
- Has a separate admin dashboard to manage all job postings

---

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Sonner (toast notifications)

---

## Requirements

Before running this project, make sure you have:

- Node.js version 18 or higher
- The backend server running (see QuickHire-backend)

---

## How to run locally

1. Go into the frontend folder:

```
cd QuickHire-frontend
```

2. Install dependencies:

```
npm install
```

3. Create a `.env.local` file in the root of the frontend folder and add:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:

```
npm run dev
```

5. Open your browser and go to `http://localhost:3000`

---

## How to use the website

### As a visitor (no login needed)

- You can browse all job listings from the home page
- Click on any job to see the full details
- Fill in your name, email, and a short message to apply for a job
- You can filter jobs by category or location from the Jobs page

### As a registered user

1. Go to the Register page and create an account with your name, email, and password
2. After registering, you will be taken to your dashboard
3. From the dashboard you can:
   - Post new job listings
   - See jobs you have already posted
   - See applications that came in for your jobs

### As an admin

Admin accounts are not created through the registration form. They are set up once using a seed script on the backend. Ask the backend developer to run the seed and share the admin credentials with you.

1. Log in with the admin email and password
2. You will be automatically redirected to the Admin Dashboard
3. From the Admin Dashboard you can:
   - Post new jobs on behalf of the platform
   - Delete any existing job listing

---

## Pages overview

| Page | URL | Who can access |
|---|---|---|
| Home | / | Everyone |
| All Jobs | /jobs | Everyone |
| Job Details | /jobs/[id] | Everyone |
| Login | /login | Everyone |
| Register | /register | Everyone |
| User Dashboard | /dashboard | Logged-in users |
| Admin Dashboard | /admin | Admin only |

---

## Build for production

```
npm run build
npm start
```
