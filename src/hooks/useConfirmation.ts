'use client';

import { useWriteContract, useReadContract, useAccount, useConfig } from 'wagmi';
import { Address, keccak256, toBytes } from 'viem';
import { createPermitSignature, PermitSignature } from '@/utils/permitSignature';
import CONFIRMATION_ABI from '@/abi/Confirmation_abi.json';
import MSC_ABI from '@/abi/MSC_abi.json';
import { toast } from 'sonner';

export const useConfirmation = () => {
  const { address, chainId } = useAccount();
  const config = useConfig();
  const { writeContractAsync } = useWriteContract();
  
  const CONFIRMATION_ADDRESS = process.env.NEXT_PUBLIC_CONFIRMATION as Address;
  const MSC_ADDRESS = process.env.NEXT_PUBLIC_MSC as Address;

  // 获取确认费用
  const { data: confirmationFee } = useReadContract({
    address: CONFIRMATION_ADDRESS,
    abi: CONFIRMATION_ABI,
    functionName: 'CONFIRMATION_FEE',
  });

  // 获取MSC token信息
  const { data: tokenName } = useReadContract({
    address: MSC_ADDRESS,
    abi: MSC_ABI,
    functionName: 'name',
  });

  const { data: eip712DomainData } = useReadContract({
    address: MSC_ADDRESS,
    abi: MSC_ABI,
    functionName: 'eip712Domain',
  });

  const tokenVersion = (eip712DomainData as any)?.[2] || '1'; // version字段，默认为'1'

  const { data: userNonce } = useReadContract({
    address: MSC_ADDRESS,
    abi: MSC_ABI,
    functionName: 'nonces',
    args: [address],
    query: {
      enabled: !!address,
    },
  });

  // 发布确认函数
  const publishConfirmation = async (mindMapId: number | string) => {
    if (!address || !chainId || !confirmationFee || !tokenName || !tokenVersion || userNonce === undefined) {
      toast.error('Missing required data for confirmation');
      return;
    }

    try {
      // 1. 从后端API获取HTML文件的哈希
      const fileHash = await getFileHashFromAPI(mindMapId.toString());
      
      // 2. 创建permit签名
      const signature: PermitSignature = await createPermitSignature(
        config,
        MSC_ADDRESS,
        address,
        CONFIRMATION_ADDRESS,
        (confirmationFee as bigint).toString(),
        userNonce as bigint,
        tokenName as string,
        tokenVersion as string,
        chainId
      );

      // 3. 调用confirm合约函数
      const tx = await writeContractAsync({
        address: CONFIRMATION_ADDRESS,
        abi: CONFIRMATION_ABI,
        functionName: 'confirm',
        args: [
          BigInt(mindMapId), // id (now a number, easily converted to BigInt)
          fileHash, // data (file hash)
          signature.deadline, // deadline
          signature.v, // v
          signature.r, // r
          signature.s, // s
        ],
      });

      // 4. 区块链交易成功后，更新数据库状态
      try {
        const updateResponse = await fetch('/api/update-publish-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: mindMapId,
            published: true,
            transactionHash: tx,
          }),
        });

        if (!updateResponse.ok) {
          throw new Error('Failed to update publish status');
        }

        const result = await updateResponse.json();
        
        toast.success('Confirmation published successfully!');
        
        // 返回成功结果和重定向URL
        return {
          transactionHash: tx,
          redirectUrl: result.redirectUrl,
          success: true,
        };
      } catch (updateError) {
        console.error('Error updating database status:', updateError);
        toast.warning('Blockchain transaction successful, but failed to update local status');
        // 即使数据库更新失败，区块链交易也成功了
        return {
          transactionHash: tx,
          redirectUrl: `/api/view/${mindMapId}`,
          success: true,
        };
      }
    } catch (error) {
      console.error('Error publishing confirmation:', error);
      toast.error('Failed to publish confirmation');
      throw error;
    }
  };

  // 从API获取文件哈希
  const getFileHashFromAPI = async (mindMapId: string): Promise<string> => {
    try {
      const response = await fetch(`/api/file-hash?id=${mindMapId}`);
      if (!response.ok) {
        throw new Error('Failed to get file hash');
      }
      const data = await response.json();
      return data.fileHash;
    } catch (error) {
      console.error('Error getting file hash from API:', error);
      throw error;
    }
  };

  // 获取确认信息
  // 获取确认信息的hook
  const useGetConfirmation = (id: number | string | null) => {
    return useReadContract({
      address: CONFIRMATION_ADDRESS,
      abi: CONFIRMATION_ABI,
      functionName: 'getConfirmation',
      args: id ? [BigInt(id)] : undefined,
      query: {
        enabled: !!id,
      },
    });
  };

  return {
    publishConfirmation,
    useGetConfirmation,
    confirmationFee,
    isReady: !!(address && chainId && confirmationFee && tokenName && tokenVersion && userNonce !== undefined),
  };
};
