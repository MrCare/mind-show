'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useHistoryData } from '@/hooks/useHistoryData';
import LatestMindMap from './LatestMindMap';
import PublishedMindMapList from './PublishedMindMapList';

interface HistoryData {
  latestUnpublishedData: {
    id: number;
    createdAt: string;
    published: boolean;
    transactionHash: string | null;
  } | null;
  publishedData: {
    id: number;
    address: string | null;
    createdAt: string;
    transactionHash: string | null;
  }[];
}

const HistoryModalContent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [historyData, setHistoryData] = useState<HistoryData | null>(null);
  
  const { address, isConnected } = useAccount();
  const { fetchHistory } = useHistoryData();

  const handleOpen = async () => {
    setIsOpen(true);
    if (isConnected && address) {
      setIsLoading(true);
      const data = await fetchHistory(address);
      setHistoryData(data);
      setIsLoading(false);
    }
  };

  const openInNewTab = (id: number, isPublished?: boolean) => {
    if (isPublished) {
      // 已发布的数据，在新标签页打开查看页面
      window.open(`/api/view/${id}`, '_blank', 'noopener,noreferrer');
    } else {
      // 未发布的数据，在新标签页打开编辑页面
      window.open(`/?id=${id}`, '_blank', 'noopener,noreferrer');
      // 关闭当前模态框
      setIsOpen(false);
    }
  };

  if (!isConnected) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        className="hover:bg-accent hover:text-accent-foreground transition-colors h-8 w-8 sm:h-10 sm:w-10 opacity-50"
      >
        <History className="h-3 w-3 sm:h-4 sm:w-4" />
        <span className="sr-only">History (Connect wallet first)</span>
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpen}
          className="hover:bg-accent hover:text-accent-foreground transition-colors h-8 w-8 sm:h-10 sm:w-10"
        >
          <History className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="sr-only">History</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            History
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[60vh] space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <PublishedMindMapList 
                data={historyData?.publishedData || []}
                onOpenMindMap={(id) => openInNewTab(id, true)}
              />
              <LatestMindMap 
                data={historyData?.latestUnpublishedData || null}
                onOpenMindMap={(id) => openInNewTab(id, false)} 
              />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModalContent;
