import React from 'react';

const MindMapSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Mind Map Toolbar Skeleton - 完整顶部工具栏 */}
      <div className="flex-shrink-0 p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-9 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
            <div className="h-9 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Mind Map Canvas Skeleton - 占满剩余空间 */}
      <div className="flex-1 relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        {/* 网格背景效果 */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(156, 163, 175, 0.3) 1px, transparent 0)
            `,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* 思维导图节点结构 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 中心主节点 */}
          <div className="relative">
            <div className="w-40 h-20 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-xl animate-pulse shadow-lg border border-gray-300 dark:border-gray-600"></div>
            
            {/* 主分支线条 */}
            <div className="absolute top-1/2 -left-24 w-24 h-1 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 -right-24 w-24 h-1 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse transform -translate-y-1/2"></div>
            <div className="absolute -top-20 left-1/2 w-1 h-20 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse transform -translate-x-1/2"></div>
            <div className="absolute -bottom-20 left-1/2 w-1 h-20 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse transform -translate-x-1/2"></div>
            
            {/* 左侧分支节点 */}
            <div className="absolute top-1/2 -left-40 transform -translate-y-1/2">
              <div className="w-24 h-14 bg-gradient-to-r from-blue-200 to-blue-300 dark:from-blue-700 dark:to-blue-600 rounded-lg animate-pulse shadow-md"></div>
              {/* 子节点 */}
              <div className="absolute -left-20 -top-4 w-16 h-10 bg-blue-100 dark:bg-blue-800 rounded animate-pulse shadow-sm"></div>
              <div className="absolute -left-20 top-8 w-18 h-10 bg-blue-100 dark:bg-blue-800 rounded animate-pulse shadow-sm"></div>
            </div>
            
            {/* 右侧分支节点 */}
            <div className="absolute top-1/2 -right-40 transform -translate-y-1/2">
              <div className="w-24 h-14 bg-gradient-to-r from-green-200 to-green-300 dark:from-green-700 dark:to-green-600 rounded-lg animate-pulse shadow-md"></div>
              {/* 子节点 */}
              <div className="absolute -right-20 -top-4 w-16 h-10 bg-green-100 dark:bg-green-800 rounded animate-pulse shadow-sm"></div>
              <div className="absolute -right-20 top-8 w-18 h-10 bg-green-100 dark:bg-green-800 rounded animate-pulse shadow-sm"></div>
            </div>
            
            {/* 上方分支节点 */}
            <div className="absolute -top-36 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-14 bg-gradient-to-r from-purple-200 to-purple-300 dark:from-purple-700 dark:to-purple-600 rounded-lg animate-pulse shadow-md"></div>
              {/* 子节点 */}
              <div className="absolute -top-6 -left-8 w-16 h-10 bg-purple-100 dark:bg-purple-800 rounded animate-pulse shadow-sm"></div>
              <div className="absolute -top-6 right-8 w-18 h-10 bg-purple-100 dark:bg-purple-800 rounded animate-pulse shadow-sm"></div>
            </div>
            
            {/* 下方分支节点 */}
            <div className="absolute -bottom-36 left-1/2 transform -translate-x-1/2">
              <div className="w-24 h-14 bg-gradient-to-r from-orange-200 to-orange-300 dark:from-orange-700 dark:to-orange-600 rounded-lg animate-pulse shadow-md"></div>
              {/* 子节点 */}
              <div className="absolute -bottom-6 -left-8 w-16 h-10 bg-orange-100 dark:bg-orange-800 rounded animate-pulse shadow-sm"></div>
              <div className="absolute -bottom-6 right-8 w-18 h-10 bg-orange-100 dark:bg-orange-800 rounded animate-pulse shadow-sm"></div>
            </div>
          </div>
        </div>
        
        {/* 右下角帮助按钮 */}
        <div className="absolute bottom-4 right-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse shadow-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default MindMapSkeleton;
