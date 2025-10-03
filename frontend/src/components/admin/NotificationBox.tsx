import { motion } from 'framer-motion';
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaBell, FaLightbulb } from 'react-icons/fa';
import { useState } from 'react';

interface NotificationBoxProps {
  notification: {
    _id: string;
    type: 'info' | 'warning' | 'success' | 'reminder' | 'suggestion';
    title: string;
    message: string;
    actionUrl?: string;
    actionText?: string;
    read: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
  };
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const NotificationBox = ({ notification, onMarkAsRead, onDelete }: NotificationBoxProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const icons = {
    info: FaInfoCircle,
    warning: FaExclamationTriangle,
    success: FaCheckCircle,
    reminder: FaBell,
    suggestion: FaLightbulb,
  };

  const colors = {
    info: 'from-blue-500 to-cyan-500',
    warning: 'from-yellow-500 to-orange-500',
    success: 'from-green-500 to-emerald-500',
    reminder: 'from-purple-500 to-pink-500',
    suggestion: 'from-indigo-500 to-purple-500',
  };

  const priorityBorder = {
    low: 'border-gray-600',
    medium: 'border-yellow-500/50',
    high: 'border-red-500',
  };

  const Icon = icons[notification.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ scale: 1.02 }}
      className={`
        relative p-4 rounded-xl bg-white/5 backdrop-blur-lg border transition-all cursor-pointer
        ${notification.read ? 'opacity-60 border-white/5' : priorityBorder[notification.priority]}
        ${isExpanded ? 'bg-white/10' : ''}
      `}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colors[notification.type]}`}>
          <Icon className="text-white text-lg" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h4 className="text-white font-semibold">{notification.title}</h4>
            {!notification.read && (
              <span className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
            )}
          </div>
          
          <p className={`text-gray-400 text-sm mt-1 ${isExpanded ? '' : 'line-clamp-2'}`}>
            {notification.message}
          </p>

          {/* Actions */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 flex items-center space-x-3"
            >
              {notification.actionUrl && (
                <a
                  href={notification.actionUrl}
                  className="px-3 py-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  {notification.actionText || 'Voir'}
                </a>
              )}
              
              {!notification.read && onMarkAsRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notification._id);
                  }}
                  className="px-3 py-1 bg-white/10 rounded-lg text-gray-300 text-sm hover:bg-white/20 transition-all"
                >
                  Marquer comme lu
                </button>
              )}
              
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notification._id);
                  }}
                  className="px-3 py-1 bg-red-500/10 rounded-lg text-red-400 text-sm hover:bg-red-500/20 transition-all"
                >
                  Supprimer
                </button>
              )}
            </motion.div>
          )}

          {/* Time */}
          <p className="text-gray-500 text-xs mt-2">
            {new Date(notification.createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationBox;
