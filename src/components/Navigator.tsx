/*
 * @Author: Mr.Car
 * @Date: 2025-09-01 23:27:52
 */
import React from "react";
import Image from "next/image";
import { CustomConnectButton } from './CustomConnectButton';
import { MSCBalanceDisplay } from './MSCBalanceDisplay';
import { HistoryModal } from './HistoryModal';
import { Button } from "@/components/ui/button";
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

const Navigator = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="w-full flex items-center justify-between px-2 sm:px-4 py-2 bg-background border-b border-border transition-colors">
      {/* Logo左侧 */}
      <div className="flex items-center justify-start">
        <Image
          className="dark:invert rounded-2xl m-1 w-8 h-8 sm:w-12 sm:h-12"
          src="/logo.jpg"
          alt="mindShowlogo"
          width={48}
          height={48}
          priority
        />
      </div>
      
      {/* 中间部分标题 */}
      <div className="flex-1 flex justify-start ml-2">
        <h1 className="text-lg sm:text-xl font-semibold text-foreground">B&C</h1>
      </div>
      
      {/* 右侧按钮组 */}
      <div className="flex items-center gap-1 sm:gap-3">
        {/* MSC Token 余额显示 - 在所有屏幕上显示 */}
        <MSCBalanceDisplay />
        
        {/* 历史记录按钮 */}
        <HistoryModal />
        
        {/* 主题切换按钮 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="hover:bg-accent hover:text-accent-foreground transition-colors h-8 w-8 sm:h-10 sm:w-10"
        >
          <Sun className="h-3 w-3 sm:h-4 sm:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-3 w-3 sm:h-4 sm:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        
        {/* RainbowKit Connect Button */}
        <CustomConnectButton />
      </div>
    </nav>
  );
};

export default Navigator;
