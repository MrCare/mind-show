'use client';

import { useReadContract, useAccount } from 'wagmi';
import { formatUnits } from 'viem';
import { useEffect, useState } from 'react';
import MSC_ABI from '@/abi/MSC_abi.json';

export const useMSCBalance = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 始终调用 hooks，但在服务器端时会返回默认值
  const { address, isConnected } = useAccount();
  const MSC_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MSC as `0x${string}`;

  const { data: balance, isError, isLoading, refetch } = useReadContract({
    address: MSC_CONTRACT_ADDRESS,
    abi: MSC_ABI,
    functionName: 'balanceOf',
    args: [address],
    query: {
      enabled: !!address && isConnected && !!MSC_CONTRACT_ADDRESS && isMounted,
      refetchInterval: 10000, // 每10秒刷新一次
    },
  });

  const { data: decimals } = useReadContract({
    address: MSC_CONTRACT_ADDRESS,
    abi: MSC_ABI,
    functionName: 'decimals',
    query: {
      enabled: !!MSC_CONTRACT_ADDRESS && isMounted,
    },
  });

  const { data: symbol } = useReadContract({
    address: MSC_CONTRACT_ADDRESS,
    abi: MSC_ABI,
    functionName: 'symbol',
    query: {
      enabled: !!MSC_CONTRACT_ADDRESS,
    },
  });

  const formattedBalance = balance && decimals 
    ? parseFloat(formatUnits(balance as bigint, decimals as number)).toFixed(2)
    : '0.00';

  return {
    balance: formattedBalance,
    symbol: symbol as string || 'MSC',
    isLoading,
    isError,
    isConnected,
    refetch,
    contractAddress: MSC_CONTRACT_ADDRESS,
  };
};
