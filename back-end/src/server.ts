import express, { Application } from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/error.middleware';

const app: Application = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/projectTFG';

mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

app.use('/auth', authRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));