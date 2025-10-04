import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
  userId: string;
  type: 'info' | 'warning' | 'success' | 'reminder' | 'suggestion';
  title: string;
  message: string;
  actionUrl?: string;
  actionText?: string;
  icon?: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  expiresAt?: Date;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'success', 'reminder', 'suggestion'],
      default: 'info',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    actionUrl: String,
    actionText: String,
    icon: String,
    read: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    expiresAt: Date,
    metadata: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
);

// Auto-delete expired notifications
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
notificationSchema.index({ userId: 1, read: 1 });

// Static method to create smart notifications
notificationSchema.statics.createSmartNotifications = async function(userId: string) {
  const notifications = [];
  
  // Check last project update
  const Project = mongoose.model('Project');
  const lastProject = await Project.findOne({ userId }).sort('-createdAt');
  if (!lastProject || new Date().getTime() - lastProject.createdAt.getTime() > 30 * 24 * 60 * 60 * 1000) {
    notifications.push({
      userId,
      type: 'suggestion',
      title: '🚀 Temps d\'ajouter un nouveau projet!',
      message: 'Tu n\'as pas ajouté de projet depuis plus de 30 jours. Partage tes dernières créations!',
      actionUrl: '/admin/projects/new',
      actionText: 'Ajouter un projet',
      priority: 'medium',
    });
  }

  // Check profile completion
  const Profile = mongoose.model('Profile');
  const profile = await Profile.findOne({ userId });
  if (profile) {
    if (!profile.avatar || profile.avatar === '/default-avatar.png') {
      notifications.push({
        userId,
        type: 'reminder',
        title: '📸 Photo de profil manquante',
        message: 'Ajoute une photo professionnelle pour personnaliser ton portfolio',
        actionUrl: '/admin/profile',
        actionText: 'Mettre à jour',
        priority: 'high',
      });
    }
    
    if (!profile.longBio || profile.longBio.length < 100) {
      notifications.push({
        userId,
        type: 'suggestion',
        title: '✏️ Enrichis ta bio',
        message: 'Ta biographie est un peu courte. Raconte ton parcours et tes passions!',
        actionUrl: '/admin/profile',
        actionText: 'Modifier la bio',
        priority: 'medium',
      });
    }

    if (new Date().getTime() - profile.lastUpdated.getTime() > 60 * 24 * 60 * 60 * 1000) {
      notifications.push({
        userId,
        type: 'reminder',
        title: '🔄 Profil à actualiser',
        message: 'Ton profil n\'a pas été mis à jour depuis 2 mois',
        actionUrl: '/admin/profile',
        actionText: 'Actualiser',
        priority: 'low',
      });
    }
  }

  // Check skills diversity
  // Avoid circular dependency - import User model dynamically
  try {
    const User = mongoose.models.User || require('./User.model').default;
    const user = await User.findById(userId);
    if (user && (!user.skills || user.skills.length < 5)) {
      notifications.push({
        userId,
        type: 'suggestion',
        title: '💡 Ajoute des compétences',
        message: 'Enrichis ton profil en ajoutant plus de compétences techniques',
        actionUrl: '/admin/skills',
        actionText: 'Gérer les compétences',
        priority: 'low',
      });
    }
  } catch (error) {
    console.error('Error checking user skills:', error);
  }

  // Save all notifications
  for (const notif of notifications) {
    const exists = await this.findOne({
      userId: notif.userId,
      title: notif.title,
      read: false,
    });
    if (!exists) {
      await this.create(notif);
    }
  }

  return notifications;
};

interface INotificationModel extends mongoose.Model<INotification> {
  createSmartNotifications(userId: string): Promise<INotification[]>;
}

const Notification = mongoose.model<INotification, INotificationModel>('Notification', notificationSchema);

export default Notification;
