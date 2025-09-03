'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, ExternalLink, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useChainId } from 'wagmi';

interface LatestMindMapProps {
  data: {
    id: number;
    createdAt: string;
    published: boolean;
    transactionHash: string | null;
  } | null;
  onOpenMindMap: (id: number) => void;
}

const LatestMindMap: React.FC<LatestMindMapProps> = ({ data, onOpenMindMap }) => {
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
    <div>
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Your Latest Unpublished Mind Map
      </h3>
      {data ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              <span>ID: {data.id}</span>
              <div className="flex items-center gap-2">
                {data.published ? (
                  <span className="flex items-center gap-1 text-green-600 text-xs">
                    <CheckCircle className="h-3 w-3" />
                    Published
                  </span>
                ) : (
                  <span className="text-gray-500 text-xs">Draft</span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenMindMap(data.id)}
                  className="h-6 px-2"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">
              Created: {formatDate(data.createdAt)}
            </p>
            {data.transactionHash && (
              <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded border">
                <p className="text-xs text-muted-foreground mb-1">Transaction Hash:</p>
                <div className="flex items-center gap-2">
                  <code 
                    className="text-xs font-mono break-all text-blue-600 dark:text-blue-400 flex-1 cursor-pointer hover:underline"
                    onClick={() => openBlockchainExplorer(data.transactionHash!)}
                    title="Click to view on blockchain explorer"
                  >
                    {data.transactionHash}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(data.transactionHash!)}
                    className="h-6 px-2 flex-shrink-0"
                    title="Copy transaction hash"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No unpublished mind maps yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LatestMindMap;
