import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';
import { redisClient } from '../server';

// Redis store for rate limiting
class RedisStore {
  windowMs: number;

  constructor(windowMs: number) {
    this.windowMs = windowMs;
  }

  async increment(key: string): Promise<{ totalHits: number; resetTime: Date }> {
    const now = Date.now();
    const resetTime = new Date(now + this.windowMs);

    if (!redisClient.isOpen) {
      return { totalHits: 1, resetTime };
    }

    const multi = redisClient.multi();
    multi.incr(key);
    multi.expire(key, Math.ceil(this.windowMs / 1000));
    
    const results = await multi.exec();
    const totalHits = results?.[0] as number || 1;

    return { totalHits, resetTime };
  }

  async decrement(key: string): Promise<void> {
    if (!redisClient.isOpen) return;
    await redisClient.decr(key);
  }

  async resetKey(key: string): Promise<void> {
    if (!redisClient.isOpen) return;
    await redisClient.del(key);
  }
}

export const rateLimiter = (max: number = 100, windowMinutes: number = 15) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
    store: redisClient.isOpen ? new RedisStore(windowMinutes * 60 * 1000) as any : undefined,
    keyGenerator: (req: Request) => {
      return req.ip || 'unknown';
    },
    handler: (req: Request, res: Response) => {
      res.status(429).json({
        error: 'Too many requests',
        message: `You have exceeded the ${max} requests in ${windowMinutes} minutes limit`,
        retryAfter: res.getHeader('Retry-After'),
      });
    },
  });
};
