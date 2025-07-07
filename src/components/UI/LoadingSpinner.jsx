import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', color = 'primary', message = 'Loading...' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const colors = {
    primary: 'border-blue-500',
    secondary: 'border-purple-500',
    accent: 'border-pink-500',
    white: 'border-white',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className={`${sizes[size]} border-4 border-t-transparent rounded-full ${colors[color]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-sm font-medium"
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner; 