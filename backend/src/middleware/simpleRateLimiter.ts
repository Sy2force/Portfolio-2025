import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

// Simple rate limiter without Redis dependency
export const rateLimiter = (windowMinutes = 15, max = 100) => {
  return rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    max,
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
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

// Pre-configured limiters
export const authLimiter = rateLimiter(15, 5); // 5 attempts per 15 minutes
export const apiLimiter = rateLimiter(15, 100); // 100 requests per 15 minutes
export const strictLimiter = rateLimiter(1, 10); // 10 requests per minute
