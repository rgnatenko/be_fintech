import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(MONGO_URI)
.then(() => console.log('Database connected'))
.catch(err => console.error('Database connection error', err));
