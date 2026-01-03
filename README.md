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



