import React from 'react';
import { motion } from 'framer-motion';

const SkeletonBox = ({ width = 'w-full', height = 'h-4', className = '' }) => (
  <motion.div
    className={`${width} ${height} bg-gray-200 rounded ${className}`}
    animate={{ opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
  />
);

export const FormSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-4">
      <SkeletonBox width="w-1/3" height="h-6" />
      <div className="grid grid-cols-2 gap-4">
        <SkeletonBox height="h-10" />
        <SkeletonBox height="h-10" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SkeletonBox height="h-10" />
        <SkeletonBox height="h-10" />
      </div>
    </div>
    
    <div className="space-y-4">
      <SkeletonBox width="w-1/4" height="h-6" />
      <SkeletonBox height="h-24" />
    </div>
    
    <div className="space-y-4">
      <SkeletonBox width="w-1/5" height="h-6" />
      <div className="space-y-2">
        <SkeletonBox height="h-8" />
        <SkeletonBox height="h-8" />
        <SkeletonBox height="h-8" />
      </div>
    </div>
  </div>
);

export const PreviewSkeleton = () => (
  <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm">
    <div className="flex items-center space-x-4">
      <SkeletonBox width="w-16" height="h-16" className="rounded-full" />
      <div className="space-y-2">
        <SkeletonBox width="w-32" height="h-6" />
        <SkeletonBox width="w-24" height="h-4" />
      </div>
    </div>
    
    <div className="space-y-3">
      <SkeletonBox width="w-full" height="h-4" />
      <SkeletonBox width="w-5/6" height="h-4" />
      <SkeletonBox width="w-4/6" height="h-4" />
    </div>
    
    <div className="space-y-2">
      <SkeletonBox width="w-1/4" height="h-5" />
      <SkeletonBox width="w-full" height="h-4" />
      <SkeletonBox width="w-3/4" height="h-4" />
    </div>
  </div>
);

export const TemplateSkeleton = () => (
  <div className="space-y-4">
    <SkeletonBox width="w-full" height="h-48" className="rounded-lg" />
    <SkeletonBox width="w-3/4" height="h-5" />
    <SkeletonBox width="w-1/2" height="h-4" />
  </div>
);

export default SkeletonBox; 