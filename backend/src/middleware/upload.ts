import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../server';

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads');
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// Multer storage configuration
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|svg|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
  }
};

// Multer configuration
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// Image optimization middleware
export const optimizeImage = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();

  try {
    const filename = `${crypto.randomBytes(16).toString('hex')}-${Date.now()}.webp`;
    const filepath = path.join(uploadDir, filename);

    // Only process images, not PDFs
    if (req.file.mimetype.startsWith('image/')) {
      // Optimize and convert to WebP
      await sharp(req.file.buffer)
        .resize(1920, 1080, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 85 })
        .toFile(filepath);

      // Generate thumbnail
      const thumbFilename = `thumb-${filename}`;
      const thumbPath = path.join(uploadDir, thumbFilename);
      
      await sharp(req.file.buffer)
        .resize(400, 300, {
          fit: 'cover',
        })
        .webp({ quality: 80 })
        .toFile(thumbPath);

      req.file.filename = filename;
      req.file.path = filepath;
      (req.file as any).thumbnail = thumbFilename;
    } else {
      // For PDFs and other files, just save as is
      const filename = `${crypto.randomBytes(16).toString('hex')}-${Date.now()}${path.extname(req.file.originalname)}`;
      const filepath = path.join(uploadDir, filename);
      
      await fs.writeFile(filepath, req.file.buffer);
      
      req.file.filename = filename;
      req.file.path = filepath;
    }

    logger.info(`File uploaded: ${req.file.filename}`);
    next();
  } catch (error) {
    logger.error('Image optimization error:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
};

// Multiple images optimization
export const optimizeImages = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.files || !Array.isArray(req.files)) return next();

  try {
    const processedFiles = await Promise.all(
      req.files.map(async (file) => {
        const filename = `${crypto.randomBytes(16).toString('hex')}-${Date.now()}.webp`;
        const filepath = path.join(uploadDir, filename);

        if (file.mimetype.startsWith('image/')) {
          await sharp(file.buffer)
            .resize(1920, 1080, {
              fit: 'inside',
              withoutEnlargement: true,
            })
            .webp({ quality: 85 })
            .toFile(filepath);

          file.filename = filename;
          file.path = filepath;
        }

        return file;
      })
    );

    req.files = processedFiles;
    next();
  } catch (error) {
    logger.error('Images optimization error:', error);
    res.status(500).json({ error: 'Failed to process images' });
  }
};

// Cloudinary upload (alternative)
export const uploadToCloudinary = async (file: Express.Multer.File): Promise<string> => {
  // Implement Cloudinary upload if needed
  return '';
};
