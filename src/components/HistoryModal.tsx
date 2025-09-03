'use client';

import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

// 动态导入 HistoryModal，禁用 SSR
const HistoryModalContent = dynamic(
  () => import('./HistoryModalContent'),
  { 
    ssr: false,
    loading: () => (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="hover:bg-accent hover:text-accent-foreground transition-colors h-8 w-8 sm:h-10 sm:w-10 opacity-50"
      >
        <History className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="sr-only">Loading...</span>
      </Button>
    )
  }
);

export const HistoryModal: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="hover:bg-accent hover:text-accent-foreground transition-colors h-8 w-8 sm:h-10 sm:w-10 opacity-50"
      >
        <History className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="sr-only">Loading...</span>
      </Button>
    );
  }

  return <HistoryModalContent />;
};
