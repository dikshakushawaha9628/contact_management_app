# Contact Management Web App

A full-stack MERN application for managing contacts with a clean, responsive UI.

## Features

- ✅ Contact form with validation (Name, Email, Phone, Message)
- ✅ Client-side and server-side validation
- ✅ Display contacts in a table without page reload
- ✅ Delete contacts functionality
- ✅ Success messages
- ✅ Basic sorting (by date, name)
- ✅ Responsive design
- ✅ Clean, modern UI

## Tech Stack

- **Frontend:** React.js with Vite
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Styling:** CSS (custom)

## Project Structure

```
contact_mangt/
├── backend/
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contacts.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, for production):
```
VITE_API_URL=your_backend_api_url
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/contacts` - Fetch all contacts
- `POST /api/contacts` - Create a new contact
- `DELETE /api/contacts/:id` - Delete a contact

## Deployment

### Option 1: Deploy to Render (Recommended - Free Tier Available)

#### Backend Deployment on Render:

1. **Create MongoDB Database:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free cluster
   - Create a database user and get your connection string
   - Add your IP to the whitelist (or use 0.0.0.0/0 for all IPs)

2. **Deploy Backend:**
   - Push your code to GitHub
   - Go to [Render](https://render.com) and create a new Web Service
   - Connect your GitHub repository
   - Configure:
     - **Name:** contact-management-backend
     - **Root Directory:** backend
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Add Environment Variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `NODE_ENV`: production
   - Deploy and copy the backend URL (e.g., `https://contact-management-backend.onrender.com`)

#### Frontend Deployment on Render:

1. **Deploy Frontend:**
   - Create a new Static Site on Render
   - Connect your GitHub repository
   - Configure:
     - **Root Directory:** frontend
     - **Build Command:** `npm install && npm run build`
     - **Publish Directory:** dist
   - Add Environment Variable:
     - `VITE_API_URL`: Your backend URL (e.g., `https://contact-management-backend.onrender.com/api`)
   - Deploy

### Option 2: Deploy to Vercel + MongoDB Atlas

#### Backend on Vercel:

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to backend: `cd backend`
3. Run: `vercel`
4. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`
5. Copy the backend URL

#### Frontend on Vercel:

1. Navigate to frontend: `cd frontend`
2. Run: `vercel`
3. Set environment variable:
   - `VITE_API_URL`: Your backend URL + `/api`
4. Deploy

### Option 3: Deploy to Netlify (Frontend) + Railway (Backend)

#### Backend on Railway:

1. Push code to GitHub
2. Go to [Railway](https://railway.app)
3. Create new project from GitHub
4. Add MongoDB service or use MongoDB Atlas
5. Set environment variables
6. Deploy

#### Frontend on Netlify:

1. Push code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Import project from GitHub
4. Configure:
   - **Base directory:** frontend
   - **Build command:** `npm run build`
   - **Publish directory:** frontend/dist
5. Add environment variable:
   - `VITE_API_URL`: Your backend URL + `/api`
6. Deploy

### Quick Deployment Checklist

- [ ] MongoDB database created (MongoDB Atlas recommended)
- [ ] Backend deployed and accessible
- [ ] Backend URL copied
- [ ] Frontend environment variable `VITE_API_URL` set to backend URL + `/api`
- [ ] Frontend deployed
- [ ] Test the application end-to-end

## Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string

### Frontend
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)

## License

ISC

