import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || '');

app.use('/api/users', userRoutes);

export default app;
