
import mongoose from 'mongoose';
import config from './env';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 30000,
      family: 4, // Force IPv4
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.disconnect();
};

export default connectDB;
