'use client';

import React, { useEffect, useState } from 'react';
import { useMSCBalance } from '@/hooks/useMSCBalance';
import { Coins, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const MSCBalanceDisplay = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 在客户端挂载前不渲染 wagmi 相关内容
  if (!isMounted) {
    return null;
  }

  return <MSCBalanceDisplayContent />;
};

const MSCBalanceDisplayContent = () => {
  const { 
    balance, 
    symbol, 
    isLoading, 
    isError, 
    isConnected,
    refetch,
    contractAddress 
  } = useMSCBalance();

  if (!isConnected) {
    return null; // 不显示未连接状态
  }

  if (isError) {
    return (
      <Button 
        variant="ghost" 
        size="sm"
        className="text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors cursor-default text-xs sm:text-sm px-1 sm:px-3"
        disabled
      >
        <Coins className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
        <span className="hidden sm:inline">Error</span>
        <span className="sm:hidden">Err</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-0 sm:gap-1">
      {/* MSC 余额显示按钮 */}
      <Button 
        variant="ghost" 
        size="sm"
        className="hover:bg-accent hover:text-accent-foreground transition-colors cursor-default text-xs sm:text-sm px-1 sm:px-3"
        disabled
      >
        <Coins className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-primary" />
        <span className="font-medium">
          {isLoading ? (
            <div className="flex items-center gap-1">
              <RefreshCw className="h-2 w-2 sm:h-3 sm:w-3 animate-spin" />
              <span className="hidden sm:inline">Loading...</span>
              <span className="sm:hidden">...</span>
            </div>
          ) : (
            <>
              <span className="hidden sm:inline">{`${balance} ${symbol}`}</span>
              <span className="sm:hidden">{balance}</span>
            </>
          )}
        </span>
      </Button>
      
      {/* 刷新按钮 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => refetch()}
        className="h-6 w-6 sm:h-8 sm:w-8 hover:bg-accent hover:text-accent-foreground transition-colors"
        disabled={isLoading}
      >
        <RefreshCw className={cn("h-3 w-3 sm:h-4 sm:w-4", isLoading && "animate-spin")} />
        <span className="sr-only">Refresh balance</span>
      </Button>
    </div>
  );
};
