import express, { Application } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes';
import blogRoutes from './routes/blog.routes';
import forumRoutes from './routes/forum.routes';
import jobApplicationRoutes from './routes/jobApplication.routes';
import dotenv from 'dotenv';
import cors from 'cors';

// Load env variables
dotenv.config();

// Express.js server
const app: Application = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', userRoutes);
app.use('/blog', blogRoutes);
app.use('/forum', forumRoutes);
app.use('/jobApplication', jobApplicationRoutes);

// MongoDB connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/projectTFG';

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));