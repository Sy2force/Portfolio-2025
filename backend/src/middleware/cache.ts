import { Request, Response, NextFunction } from 'express';
import { logger } from '../server';

interface CacheOptions {
  ttl?: number;
  key?: (req: Request) => string;
}

// Simple no-op cache middleware (Redis disabled)
export const cache = (ttl: number = 300, options: CacheOptions = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    next();
  };
};

export const clearCache = async (pattern: string = '*'): Promise<void> => {
  logger.debug('Cache clearing disabled (no Redis)');
};

export const cacheMiddleware = {
  cache,
  clearCache,
};
