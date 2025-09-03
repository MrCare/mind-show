'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useChainId } from 'wagmi';

interface PublishedMindMapItemProps {
  item: {
    id: number;
    address: string | null;
    createdAt: string;
    transactionHash: string | null;
  };
  onOpenMindMap: (id: number) => void;
}

const PublishedMindMapItem: React.FC<PublishedMindMapItemProps> = ({ item, onOpenMindMap }) => {
  const chainId = useChainId();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateAddress = (addr: string | null) => {
    if (!addr) return 'Unknown';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const openBlockchainExplorer = (transactionHash: string) => {
    let explorerUrl = '';
    
    switch (chainId) {
      case 1: // Ethereum Mainnet
        explorerUrl = `https://etherscan.io/tx/${transactionHash}`;
        break;
      case 11155111: // Sepolia Testnet
        explorerUrl = `https://sepolia.etherscan.io/tx/${transactionHash}`;
        break;
      case 137: // Polygon Mainnet
        explorerUrl = `https://polygonscan.com/tx/${transactionHash}`;
        break;
      case 10: // Optimism
        explorerUrl = `https://optimistic.etherscan.io/tx/${transactionHash}`;
        break;
      case 42161: // Arbitrum One
        explorerUrl = `https://arbiscan.io/tx/${transactionHash}`;
        break;
      case 8453: // Base
        explorerUrl = `https://basescan.org/tx/${transactionHash}`;
        break;
      default:
        explorerUrl = `https://etherscan.io/tx/${transactionHash}`;
        break;
    }
    
    window.open(explorerUrl, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Transaction hash copied to clipboard');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <Card className="hover:bg-accent/50 transition-colors">
      <CardContent className="py-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">ID: {item.id}</span>
              <span className="text-xs text-muted-foreground">
                by {truncateAddress(item.address)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              {formatDate(item.createdAt)}
            </p>
            {item.transactionHash && (
              <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border">
                <p className="text-xs text-muted-foreground mb-1">Transaction:</p>
                <div className="flex items-center gap-2">
                  <code 
                    className="text-xs font-mono break-all text-blue-600 dark:text-blue-400 flex-1 cursor-pointer hover:underline"
                    onClick={() => openBlockchainExplorer(item.transactionHash!)}
                    title="Click to view on blockchain explorer"
                  >
                    {item.transactionHash}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(item.transactionHash!)}
                    className="h-6 px-2 flex-shrink-0"
                    title="Copy transaction hash"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenMindMap(item.id)}
            className="h-8 px-2 flex-shrink-0"
            title="View mind map"
          >
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublishedMindMapItem;
