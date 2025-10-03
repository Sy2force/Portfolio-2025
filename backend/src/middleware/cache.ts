import { Request, Response, NextFunction } from 'express';
import { redisClient, logger } from '../server';

interface CacheOptions {
  ttl?: number;
  key?: (req: Request) => string;
}

export const cache = (ttl: number = 300, options: CacheOptions = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!redisClient.isOpen) {
      return next();
    }

    const key = options.key ? options.key(req) : `cache:${req.originalUrl}`;
    
    try {
      const cached = await redisClient.get(key);
      
      if (cached) {
        logger.debug(`Cache hit: ${key}`);
        res.json(JSON.parse(cached));
        return;
      }
      
      logger.debug(`Cache miss: ${key}`);
      
      // Store original res.json
      const originalJson = res.json.bind(res);
      
      // Override res.json
      res.json = (body: any) => {
        // Cache the response
        redisClient.setEx(key, ttl, JSON.stringify(body)).catch(err => {
          logger.error('Cache set error:', err);
        });
        
        return originalJson(body);
      };
      
      next();
    } catch (error) {
      logger.error('Cache middleware error:', error);
      next();
    }
  };
};

export const clearCache = async (pattern: string = '*'): Promise<void> => {
  if (!redisClient.isOpen) return;
  
  try {
    const keys = await redisClient.keys(`cache:${pattern}`);
    if (keys.length > 0) {
      await redisClient.del(keys);
      logger.debug(`Cleared ${keys.length} cache entries`);
    }
  } catch (error) {
    logger.error('Clear cache error:', error);
  }
};

export const cacheMiddleware = {
  cache,
  clearCache,
};
