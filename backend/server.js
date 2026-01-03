import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contacts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [`${process.env.FRONTEND_URL}`],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/contacts', contactRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Contact Management API is running' });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;