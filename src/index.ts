import dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || '');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
