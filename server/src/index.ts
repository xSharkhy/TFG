import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/projectTFG';

mongoose
	.connect(MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error(err));
