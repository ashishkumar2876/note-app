Note-Taking Application
A full-stack web application for creating, managing, and deleting personal notes. The application features a secure authentication system using both email-based OTP and Google Sign-In.

✨ Features
User Authentication: Secure sign-up and login via email OTP or Google Sign-In.

Protected Routes: The dashboard and notes API are accessible only to authenticated users.

Notes Management: Users can create, view, and delete their private notes.

Responsive UI: A clean, modern, and responsive user interface built with Tailwind CSS.

State Management: Global state for user authentication and notes is managed with Zustand.

🚀 Technologies
Frontend
React: A JavaScript library for building user interfaces.

Vite: A fast build tool for modern web projects.

TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

React Router DOM: For client-side routing and protected routes.

Zustand: A small, fast, and scalable state-management solution.

Axios: A promise-based HTTP client for API calls.

@react-oauth/google: For seamless Google authentication integration.

Backend
Node.js & Express: A fast, unopinionated web framework for Node.js.

Mongoose: An elegant MongoDB object modeling for Node.js.

MongoDB Atlas: A cloud-based NoSQL database for persistent storage.

JWT: JSON Web Tokens for secure, stateless authentication.

Nodemailer: For sending email-based OTPs.

Brevo: An email service provider used with Nodemailer for email delivery.

⚙️ Setup Instructions
Prerequisites
Node.js (v18 or higher)

npm (Node Package Manager)

MongoDB Atlas account

Brevo account (for email sending)

Google Cloud Console Project (for Google Sign-In)

1. Backend Setup
Navigate to the backend directory.

cd backend

Install the backend dependencies.

npm install

Create a .env file in the backend directory and add your environment variables.

PORT=4000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=a_strong_random_secret_key
GOOGLE_CLIENT_ID=your_google_cloud_client_id
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=your_brevo_smtp_login_email
BREVO_SMTP_PASS=your_brevo_smtp_key
BREVO_SENDER_EMAIL=your_verified_brevo_sender_email

Start the backend development server.

npm run dev

2. Frontend Setup
Navigate to the frontend directory.

cd ../frontend

Install the frontend dependencies.

npm install

Create a .env file in the frontend directory and add your Google Client ID.

VITE_GOOGLE_CLIENT_ID=your_google_cloud_client_id

Start the frontend development server.

npm run dev

🌐 Usage
Open your browser and navigate to http://localhost:5173. You can now:

Log In: Use the email OTP flow or click the "Sign in with Google" button.

Access Dashboard: After logging in, you will be redirected to the dashboard.

Create Notes: Use the form on the dashboard to create new notes.

Manage Notes: View your notes and delete them as needed.

This project is a great example of a modern full-stack application with a robust authentication system.
