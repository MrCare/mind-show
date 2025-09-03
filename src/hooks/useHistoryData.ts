'use client';

import { toast } from 'sonner';

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

export const useHistoryData = () => {
  const fetchHistory = async (address: string): Promise<HistoryData | null> => {
    if (!address) {
      toast.error('Please connect your wallet first');
      return null;
    }

    try {
      const response = await fetch(`/api/history?address=${address}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }

      const result = await response.json();
      
      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching history:', error);
      toast.error('Failed to load history data');
      return null;
    }
  };

  return { fetchHistory };
};
