import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    
    await mongoose.connect(mongoURI);
    
    // MongoDB Connected successfully
  } catch {
    // Database connection error - exit process
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  // MongoDB disconnected
});

mongoose.connection.on('error', (_err) => {
  // MongoDB error occurred
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  // MongoDB connection closed through app termination
  process.exit(0);
});

export default connectDB;
