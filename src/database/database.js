import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const databaseConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✔️ Connected to MongoDB!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default databaseConnect;