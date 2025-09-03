import React from 'react';

const MindMapPreviewSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col p-0 gap-0">
      {/* Header Skeleton */}
      <div className="flex-shrink-0 pb-2 px-3 pt-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="flex gap-1">
            <div className="h-7 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-7 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col overflow-hidden p-3 pt-0">
        <div className="h-full bg-gray-100 dark:bg-gray-800 rounded border">
          <div className="p-6 space-y-4">
            {/* Title Skeleton */}
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            
            {/* Content Lines */}
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            
            {/* List Items Skeleton */}
            <div className="space-y-2 ml-4">
              <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            
            {/* More Content */}
            <div className="space-y-3 mt-6">
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="space-y-2 ml-4">
                <div className="h-3 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-3 w-3/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindMapPreviewSkeleton;
