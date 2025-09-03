import React from 'react';

const NavigatorSkeleton: React.FC = () => {
  return (
    <nav className="w-full flex items-center justify-between px-2 sm:px-4 py-2 bg-background border-b border-border transition-colors">
      {/* Logo 占位符 */}
      <div className="flex items-center justify-start">
        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse m-1"></div>
      </div>
      
      {/* 中间标题占位符 */}
      <div className="flex-1 flex justify-start ml-2">
        <div className="h-6 sm:h-7 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
      
      {/* 右侧按钮组占位符 */}
      <div className="flex items-center gap-1 sm:gap-3">
        {/* MSC Token 余额显示占位符 */}
        <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        
        {/* 历史记录按钮占位符 */}
        <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        
        {/* 主题切换按钮占位符 */}
        <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        
        {/* Connect Button 占位符 */}
        <div className="h-8 sm:h-10 w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    </nav>
  );
};

export default NavigatorSkeleton;
