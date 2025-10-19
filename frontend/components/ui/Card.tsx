'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = true,
  gradient = false,
  glass = false,
  padding = 'md',
  onClick,
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseStyles = cn(
    'rounded-2xl transition-all duration-300',
    paddingStyles[padding],
    {
      'bg-white dark:bg-gray-800 shadow-lg': !gradient && !glass,
      'bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/90 dark:to-gray-900/70 shadow-xl': gradient,
      'bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/20': glass,
      'hover:shadow-2xl hover:scale-[1.02] cursor-pointer': hover && onClick,
      'hover:shadow-xl': hover && !onClick,
    },
    className
  );

  if (onClick) {
    return (
      <motion.div
        className={baseStyles}
        onClick={onClick}
        whileHover={hover ? { y: -4 } : {}}
        whileTap={hover ? { scale: 0.98 } : {}}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={baseStyles}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;
