import { createClient } from 'redis';
import { logger } from '../server';

// Redis configuration with fallback
export const initRedis = async () => {
  if (process.env.REDIS_URL && process.env.NODE_ENV === 'production') {
    try {
      const client = createClient({
        url: process.env.REDIS_URL,
      });
      
      client.on('error', (err) => {
        logger.error('Redis Client Error:', err);
      });
      
      await client.connect();
      logger.info('Redis connected successfully');
      return client;
    } catch (error) {
      logger.warn('Redis connection failed, using memory store as fallback');
      return null;
    }
  }
  
  // In development or if Redis fails, return null (will use memory store)
  return null;
};

export let redisClient: ReturnType<typeof createClient> | null = null;

export const setRedisClient = (client: any) => {
  redisClient = client;
};
