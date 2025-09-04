import React from 'react';

const MindMapSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-background">
      <style jsx>{`
        .rotate-30 { transform: rotate(30deg); }
        .-rotate-30 { transform: rotate(-30deg); }
      `}</style>
      {/* MindElixir样式的画布区域 */}
      <div className="w-full h-full p-4">
        <div className="w-full h-full relative bg-background border rounded overflow-hidden">
          {/* 模拟MindElixir的工具栏 */}
          <div className="absolute top-2 left-2 flex items-center gap-1 z-10">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          {/* 模拟思维导图内容区域 */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* 网状思维导图结构 */}
            <div className="relative">
              {/* 中心主节点 */}
              <div className="w-40 h-16 bg-gradient-to-r from-primary/30 to-primary/40 rounded-xl animate-pulse shadow-md border border-primary/30 flex items-center justify-center">
                <div className="w-24 h-3 bg-primary/50 rounded animate-pulse"></div>
              </div>
              
              {/* 第一层分支连接线 */}
              <div className="absolute top-1/2 -left-24 w-24 h-0.5 bg-primary/40 animate-pulse transform -translate-y-1/2"></div>
              <div className="absolute top-1/2 -right-24 w-24 h-0.5 bg-primary/40 animate-pulse transform -translate-y-1/2"></div>
              <div className="absolute -top-20 left-1/2 w-0.5 h-20 bg-primary/40 animate-pulse transform -translate-x-1/2"></div>
              <div className="absolute -bottom-20 left-1/2 w-0.5 h-20 bg-primary/40 animate-pulse transform -translate-x-1/2"></div>
              
              {/* 左侧主分支 */}
              <div className="absolute top-1/2 -left-44 transform -translate-y-1/2">
                <div className="w-32 h-12 bg-gradient-to-r from-blue-200/70 to-blue-300/70 dark:from-blue-700/50 dark:to-blue-600/50 rounded-lg animate-pulse shadow-sm border border-blue-300/30">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-20 h-2.5 bg-blue-400/60 rounded animate-pulse"></div>
                  </div>
                </div>
                
                {/* 左侧子分支 */}
                <div className="absolute top-1/2 -left-20 w-20 h-0.5 bg-blue-400/50 animate-pulse transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 -left-36 transform -translate-y-1/2">
                  <div className="w-24 h-8 bg-blue-100/80 dark:bg-blue-800/60 rounded animate-pulse shadow-sm flex items-center justify-center">
                    <div className="w-16 h-2 bg-blue-300/70 rounded animate-pulse"></div>
                  </div>
                </div>
                
                {/* 左侧子分支2 */}
                <div className="absolute -top-16 -left-8 w-16 h-0.5 bg-blue-400/50 animate-pulse transform rotate-45"></div>
                <div className="absolute -top-20 -left-8 transform">
                  <div className="w-20 h-7 bg-blue-100/80 dark:bg-blue-800/60 rounded animate-pulse shadow-sm flex items-center justify-center">
                    <div className="w-14 h-1.5 bg-blue-300/70 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* 右侧主分支 */}
              <div className="absolute top-1/2 -right-44 transform -translate-y-1/2">
                <div className="w-32 h-12 bg-gradient-to-r from-green-200/70 to-green-300/70 dark:from-green-700/50 dark:to-green-600/50 rounded-lg animate-pulse shadow-sm border border-green-300/30">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-20 h-2.5 bg-green-400/60 rounded animate-pulse"></div>
                  </div>
                </div>
                
                {/* 右侧子分支 */}
                <div className="absolute top-1/2 -right-20 w-20 h-0.5 bg-green-400/50 animate-pulse transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 -right-36 transform -translate-y-1/2">
                  <div className="w-24 h-8 bg-green-100/80 dark:bg-green-800/60 rounded animate-pulse shadow-sm flex items-center justify-center">
                    <div className="w-16 h-2 bg-green-300/70 rounded animate-pulse"></div>
                  </div>
                </div>
                
                {/* 右侧子分支2 */}
                <div className="absolute top-16 -right-8 w-16 h-0.5 bg-green-400/50 animate-pulse transform -rotate-45"></div>
                <div className="absolute top-20 -right-8 transform">
                  <div className="w-20 h-7 bg-green-100/80 dark:bg-green-800/60 rounded animate-pulse shadow-sm flex items-center justify-center">
                    <div className="w-14 h-1.5 bg-green-300/70 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* 上方主分支 */}
              <div className="absolute -top-36 left-1/2 transform -translate-x-1/2">
                <div className="w-28 h-12 bg-gradient-to-r from-purple-200/70 to-purple-300/70 dark:from-purple-700/50 dark:to-purple-600/50 rounded-lg animate-pulse shadow-sm border border-purple-300/30">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-18 h-2.5 bg-purple-400/60 rounded animate-pulse"></div>
                  </div>
                </div>
                
                {/* 上方子分支 */}
                <div className="absolute -top-16 left-1/2 w-0.5 h-16 bg-purple-400/50 animate-pulse transform -translate-x-1/2"></div>
                <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
                  <div className="w-22 h-7 bg-purple-100/80 dark:bg-purple-800/60 rounded animate-pulse shadow-sm flex items-center justify-center">
                    <div className="w-14 h-1.5 bg-purple-300/70 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* 下方主分支 */}
              <div className="absolute -bottom-36 left-1/2 transform -translate-x-1/2">
                <div className="w-28 h-12 bg-gradient-to-r from-orange-200/70 to-orange-300/70 dark:from-orange-700/50 dark:to-orange-600/50 rounded-lg animate-pulse shadow-sm border border-orange-300/30">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-18 h-2.5 bg-orange-400/60 rounded animate-pulse"></div>
                  </div>
                </div>
                
                {/* 下方子分支连接线 */}
                <div className="absolute -bottom-16 left-1/2 w-0.5 h-16 bg-orange-400/50 animate-pulse transform -translate-x-1/2"></div>
                <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2">
                  <div className="w-22 h-7 bg-orange-100/80 dark:bg-orange-800/60 rounded animate-pulse shadow-sm flex items-center justify-center">
                    <div className="w-14 h-1.5 bg-orange-300/70 rounded animate-pulse"></div>
                  </div>
                </div>
                
                {/* 额外的网状连接 */}
                <div className="absolute -bottom-8 -left-12 w-12 h-0.5 bg-orange-400/40 animate-pulse transform rotate-45"></div>
                <div className="absolute -bottom-8 -right-12 w-12 h-0.5 bg-orange-400/40 animate-pulse transform -rotate-45"></div>
              </div>
              
              {/* 额外的网状连接线 */}
              <div className="absolute -top-12 -left-16 w-20 h-0.5 bg-gray-300/50 dark:bg-gray-600/50 animate-pulse transform rotate-30"></div>
              <div className="absolute -top-12 -right-16 w-20 h-0.5 bg-gray-300/50 dark:bg-gray-600/50 animate-pulse transform -rotate-30"></div>
              <div className="absolute -bottom-12 -left-16 w-20 h-0.5 bg-gray-300/50 dark:bg-gray-600/50 animate-pulse transform -rotate-30"></div>
              <div className="absolute -bottom-12 -right-16 w-20 h-0.5 bg-gray-300/50 dark:bg-gray-600/50 animate-pulse transform rotate-30"></div>
            </div>
          </div>
          
          {/* 右下角帮助按钮 */}
          <div className="absolute bottom-4 right-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full animate-pulse shadow-lg border border-primary/30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MindMapSkeleton;
