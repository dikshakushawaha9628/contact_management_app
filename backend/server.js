import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contacts.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/contacts", contactRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Contact Management API is running" });
});

// Start DB connection (not awaited for faster cold starts)
connectDB();

// NO app.listen() for Vercel
export default app;