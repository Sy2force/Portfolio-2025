import mongoose from 'mongoose';

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-shay';

export const connectDatabase = async (): Promise<void> => {
  try {
    // Connecting to MongoDB...
    
    await mongoose.connect(mongoURI);
    // MongoDB connected successfully
    
    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      // MongoDB connection error: ${err}
      process.stderr.write(`❌ MongoDB connection error: ${err}\n`);
    });
    
    mongoose.connection.on('disconnected', () => {
      // MongoDB disconnected
    });
    
    mongoose.connection.on('reconnected', () => {
      // MongoDB reconnected
    });
    
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
    
  } catch (error) {
    process.stderr.write(`Failed to connect to MongoDB: ${error}\n`);
    process.exit(1);
  }
};

export default connectDatabase;
