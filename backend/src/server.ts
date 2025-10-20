import app from './app';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT || 5001;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDatabase();
    
    // Start Express server
    app.listen(PORT, () => {
      // Server running on port ${PORT}
      // Environment: ${process.env.NODE_ENV || 'development'}
      // API URL: http://localhost:${PORT}/api
      // Portfolio Backend is ready!
    });
  } catch (error) {
    process.stderr.write(`❌ Failed to start server: ${error}\n`);
    process.exit(1);
  }
}

startServer();
