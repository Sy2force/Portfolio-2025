import { Router } from 'express';
import { upload, optimizeImage, optimizeImages } from '../middleware/upload';
import { logger } from '../server';
import path from 'path';
import fs from 'fs/promises';

const router = Router();

// Upload single image
router.post('/image',
  upload.single('image'),
  optimizeImage,
  async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No image provided' });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      const thumbnailUrl = req.file.thumbnail ? `/uploads/${req.file.thumbnail}` : null;

      res.json({
        success: true,
        image: {
          url: imageUrl,
          thumbnail: thumbnailUrl,
          originalName: req.file.originalname,
          size: req.file.size,
        },
      });
    } catch (error) {
      logger.error('Image upload error:', error);
      res.status(500).json({ error: 'Failed to upload image' });
    }
  }
);

// Upload multiple images
router.post('/images',
  upload.array('images', 10),
  optimizeImages,
  async (req: any, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No images provided' });
      }

      const images = req.files.map((file: any) => ({
        url: `/uploads/${file.filename}`,
        originalName: file.originalname,
        size: file.size,
      }));

      res.json({
        success: true,
        images,
      });
    } catch (error) {
      logger.error('Images upload error:', error);
      res.status(500).json({ error: 'Failed to upload images' });
    }
  }
);

// Upload document (PDF, etc.)
router.post('/document',
  upload.single('document'),
  async (req: any, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No document provided' });
      }

      const documentUrl = `/uploads/${req.file.filename}`;

      res.json({
        success: true,
        document: {
          url: documentUrl,
          originalName: req.file.originalname,
          size: req.file.size,
          type: req.file.mimetype,
        },
      });
    } catch (error) {
      logger.error('Document upload error:', error);
      res.status(500).json({ error: 'Failed to upload document' });
    }
  }
);

// Delete file
router.delete('/:filename',
  async (req, res) => {
    try {
      const filepath = path.join(__dirname, '../../uploads', req.params.filename);
      
      // Check if file exists
      await fs.access(filepath);
      
      // Delete file
      await fs.unlink(filepath);
      
      // Try to delete thumbnail if it exists
      const thumbPath = path.join(__dirname, '../../uploads', `thumb-${req.params.filename}`);
      try {
        await fs.unlink(thumbPath);
      } catch (error) {
        // Thumbnail might not exist, ignore error
      }

      res.json({
        success: true,
        message: 'File deleted successfully',
      });
    } catch (error) {
      logger.error('Delete file error:', error);
      res.status(404).json({ error: 'File not found' });
    }
  }
);

// Get all uploaded files (for admin)
router.get('/list',
  async (req, res) => {
    try {
      const uploadsDir = path.join(__dirname, '../../uploads');
      const files = await fs.readdir(uploadsDir);
      
      const fileDetails = await Promise.all(
        files.map(async (filename) => {
          const filepath = path.join(uploadsDir, filename);
          const stats = await fs.stat(filepath);
          
          return {
            filename,
            url: `/uploads/${filename}`,
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime,
            isThumb: filename.startsWith('thumb-'),
          };
        })
      );

      res.json({
        success: true,
        files: fileDetails.filter(f => !f.isThumb),
        total: fileDetails.filter(f => !f.isThumb).length,
      });
    } catch (error) {
      logger.error('List files error:', error);
      res.status(500).json({ error: 'Failed to list files' });
    }
  }
);

export default router;
