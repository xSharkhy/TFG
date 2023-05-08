import express, { Application } from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';
import dotenv from 'dotenv';
import cors from 'cors';

// Load env variables
dotenv.config();

// Express.js server
const app: Application = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/projectTFG';

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));