'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HelpCircle, Keyboard, Smartphone } from 'lucide-react';

export const MindMapHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 检测设备类型
  useEffect(() => {
    const checkIsMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
      const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
      
      // 也检查触摸能力和屏幕尺寸
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      
      setIsMobile(isMobileUA || (isTouchDevice && isSmallScreen));
    };

    checkIsMobile();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const desktopShortcuts = [
    { key: 'Tab', description: 'Add sibling node' },
    { key: 'Enter', description: 'Add child node' },
    { key: 'Delete', description: 'Delete selected node' },
    { key: 'F2', description: 'Edit node text' },
    { key: 'Ctrl + Z', description: 'Undo' },
    { key: 'Ctrl + Y', description: 'Redo' },
    { key: 'Arrow Keys', description: 'Navigate nodes' },
    { key: 'Space', description: 'Expand/Collapse node' },
    { key: 'Ctrl + Mouse Wheel', description: 'Zoom in/out' },
    { key: 'Mouse Drag', description: 'Move canvas' },
  ];

  const mobileGestures = [
    { gesture: 'Double tap node', description: 'Edit node text' },
    { gesture: 'Long press node', description: 'Show context menu' },
    { gesture: 'Single tap node', description: 'Select node' },
    { gesture: 'Pinch gesture', description: 'Zoom in/out canvas' },
    { gesture: 'Single finger drag', description: 'Move canvas' },
    { gesture: 'Drag node', description: 'Move node' },
    { gesture: 'Tap empty space', description: 'Deselect' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
        >
          {isMobile ? (
            <Smartphone className="h-4 w-4" />
          ) : (
            <HelpCircle className="h-4 w-4" />
          )}
          <span className="sr-only">Show operations help</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            {isMobile ? 'Mobile Operations Guide' : 'Desktop Operations Guide'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 根据设备类型显示相应的操作指南 */}
          {!isMobile ? (
            /* 桌面端快捷键 */
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Keyboard className="h-4 w-4" />
                Keyboard Shortcuts
              </h3>
              <div className="grid gap-2">
                {desktopShortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm"
                  >
                    <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded border text-xs">
                      {shortcut.key}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {shortcut.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* 移动端手势 */
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Smartphone className="h-4 w-4" />
                Touch Gestures
              </h3>
              <div className="grid gap-2">
                {mobileGestures.map((gesture, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md text-sm"
                  >
                    <span className="font-medium text-blue-600 dark:text-blue-400 min-w-0 flex-shrink-0 mr-3">
                      {gesture.gesture}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 text-right">
                      {gesture.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MindMapHelp;
