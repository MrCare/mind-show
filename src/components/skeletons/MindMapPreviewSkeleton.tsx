import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MindMapPreviewSkeleton: React.FC = () => {
  return (
    <Card className="w-full h-full flex flex-col p-0 gap-0">
      <CardHeader className="flex-shrink-0 pb-2 px-3 pt-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="flex gap-1">
            <div className="h-7 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col overflow-hidden p-3 pt-0">
        <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center shadow-sm">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="text-center space-y-2">
            <div className="h-5 w-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
            <div className="space-y-1">
              <div className="h-3 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
              <div className="h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
              <div className="h-3 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MindMapPreviewSkeleton;
