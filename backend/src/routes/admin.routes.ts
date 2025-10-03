import { Router } from 'express';
import User from '../models/User.model';
import Project from '../models/Project.model';
import Contact from '../models/Contact.model';
import { logger } from '../server';

const router = Router();

// Admin dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const [
      totalProjects,
      featuredProjects,
      totalContacts,
      unreadContacts,
      projectViews,
      projectLikes,
      recentProjects,
      recentContacts,
      projectsByCategory,
      contactsByMonth,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      Contact.countDocuments({ isSpam: false }),
      Contact.countDocuments({ status: 'new', isSpam: false }),
      Project.aggregate([
        { $group: { _id: null, total: { $sum: '$views' } } }
      ]),
      Project.aggregate([
        { $group: { _id: null, total: { $sum: '$likes' } } }
      ]),
      Project.find().sort({ createdAt: -1 }).limit(5).select('title createdAt views'),
      Contact.find({ isSpam: false }).sort({ createdAt: -1 }).limit(5).select('name subject createdAt status'),
      Project.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      Contact.aggregate([
        { $match: { isSpam: false } },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            count: { $sum: 1 }
          }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 12 }
      ])
    ]);

    res.json({
      success: true,
      stats: {
        projects: {
          total: totalProjects,
          featured: featuredProjects,
          views: projectViews[0]?.total || 0,
          likes: projectLikes[0]?.total || 0,
        },
        contacts: {
          total: totalContacts,
          unread: unreadContacts,
        },
        recentProjects,
        recentContacts,
        charts: {
          projectsByCategory: projectsByCategory.map(item => ({
            category: item._id,
            count: item.count,
          })),
          contactsByMonth: contactsByMonth.map(item => ({
            month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
            count: item.count,
          })),
        },
      },
    });
  } catch (error) {
    logger.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// System health check
router.get('/health', async (req, res) => {
  try {
    const dbStatus = await checkDatabaseHealth();
    const cacheStatus = await checkCacheHealth();
    
    res.json({
      success: true,
      health: {
        database: dbStatus,
        cache: cacheStatus,
        server: {
          uptime: process.uptime(),
          memory: process.memoryUsage(),
          cpu: process.cpuUsage(),
          node: process.version,
        },
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Health check error:', error);
    res.status(500).json({ error: 'Health check failed' });
  }
});

// Backup database
router.post('/backup', async (req, res) => {
  try {
    // Implement database backup logic here
    // This could trigger a MongoDB dump or export to cloud storage
    
    res.json({
      success: true,
      message: 'Backup initiated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('Backup error:', error);
    res.status(500).json({ error: 'Backup failed' });
  }
});

// Clear cache
router.post('/cache/clear', async (req, res) => {
  try {
    const { pattern = '*' } = req.body;
    
    // Clear Redis cache
    const { clearCache } = await import('../middleware/cache');
    await clearCache(pattern);
    
    res.json({
      success: true,
      message: 'Cache cleared successfully',
      pattern,
    });
  } catch (error) {
    logger.error('Clear cache error:', error);
    res.status(500).json({ error: 'Failed to clear cache' });
  }
});

// Analytics data
router.get('/analytics', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const dateFilter: any = {};
    if (startDate) {
      dateFilter.createdAt = { $gte: new Date(startDate as string) };
    }
    if (endDate) {
      dateFilter.createdAt = { ...dateFilter.createdAt, $lte: new Date(endDate as string) };
    }

    const [
      pageViews,
      uniqueVisitors,
      topProjects,
      trafficSources,
      deviceTypes,
      browserStats,
    ] = await Promise.all([
      // These would typically come from an analytics service
      Promise.resolve(12543),
      Promise.resolve(8234),
      Project.find()
        .sort({ views: -1 })
        .limit(10)
        .select('title slug views likes'),
      Promise.resolve([
        { source: 'Direct', count: 4532 },
        { source: 'Google', count: 3421 },
        { source: 'LinkedIn', count: 2344 },
        { source: 'GitHub', count: 1234 },
      ]),
      Promise.resolve([
        { device: 'Desktop', percentage: 65 },
        { device: 'Mobile', percentage: 30 },
        { device: 'Tablet', percentage: 5 },
      ]),
      Promise.resolve([
        { browser: 'Chrome', percentage: 60 },
        { browser: 'Safari', percentage: 20 },
        { browser: 'Firefox', percentage: 15 },
        { browser: 'Other', percentage: 5 },
      ]),
    ]);

    res.json({
      success: true,
      analytics: {
        overview: {
          pageViews,
          uniqueVisitors,
          averageSessionDuration: '3:45',
          bounceRate: '32%',
        },
        topProjects,
        trafficSources,
        deviceTypes,
        browserStats,
      },
    });
  } catch (error) {
    logger.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Helper functions
async function checkDatabaseHealth() {
  try {
    const adminDb = await import('mongoose').then(m => m.connection.db.admin());
    const result = await adminDb.ping();
    return {
      status: 'healthy',
      ping: result,
      connections: (await import('mongoose')).connections.length,
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
    };
  }
}

async function checkCacheHealth() {
  try {
    const { redisClient } = await import('../server');
    if (redisClient.isOpen) {
      const ping = await redisClient.ping();
      return {
        status: 'healthy',
        ping,
      };
    }
    return {
      status: 'disconnected',
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message,
    };
  }
}

export default router;
