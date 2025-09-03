/*
 * @Author: Mr.Car
 * @Date: 2025-09-03 11:40:44
 */
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useConfirmation } from '@/hooks/useConfirmation';
import { useAccount } from 'wagmi';
import { Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PublishButtonProps {
  mindMapId: number | string;
  onPublishSuccess?: () => void;
  onPublishClick?: () => Promise<void>; // 添加发布前的回调
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost';
}

export const PublishButton: React.FC<PublishButtonProps> = ({
  mindMapId,
  onPublishSuccess,
  onPublishClick,
  disabled = false,
  size = 'default',
  variant = 'default',
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const { publishConfirmation, confirmationFee, isReady } = useConfirmation();
  const { isConnected } = useAccount();

  const handlePublish = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!isReady) {
      toast.error('Confirmation system not ready. Please try again.');
      return;
    }

    setIsPublishing(true);
    try {
      // 如果有发布前的回调，先执行
      if (onPublishClick) {
        await onPublishClick();
      }
      
      const result = await publishConfirmation(mindMapId);
      if (result && result.success) {
        onPublishSuccess?.();
        toast.success(`Published successfully! Transaction: ${result.transactionHash}`);
        
        // 跳转到发布的页面（在新标签页中打开）
        if (result.redirectUrl) {
          setTimeout(() => {
            window.open(result.redirectUrl, '_blank', 'noopener,noreferrer');
          }, 1500); // 延迟1.5秒让用户看到成功消息
        }
      }
    } catch (error) {
      console.error('Publish error:', error);
      // toast已经在hook中处理了
    } finally {
      setIsPublishing(false);
    }
  };

  if (!isConnected) {
    return (
      <Button 
        variant="outline" 
        size={size}
        disabled
        className={`cursor-not-allowed opacity-50 ${size === 'sm' ? 'h-7 px-2 text-xs' : ''}`}
      >
        <Upload className={`${size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
        {size === 'sm' ? 'Connect Wallet' : 'Connect Wallet to Publish'}
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <Button
        onClick={handlePublish}
        disabled={disabled || isPublishing || !isReady}
        size={size}
        variant={variant}
        className={`bg-primary hover:bg-primary/90 text-primary-foreground ${size === 'sm' ? 'h-7 px-2 text-xs' : ''}`}
      >
        {isPublishing ? (
          <>
            <Loader2 className={`${size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'} animate-spin`} />
            {size === 'sm' ? 'Publishing...' : 'Publishing...'}
          </>
        ) : (
          <>
            <Upload className={`${size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'}`} />
            {size === 'sm' ? 'Publish' : 'Publish to Blockchain'}
          </>
        )}
      </Button>
      
      {typeof confirmationFee === 'bigint' && isReady && size !== 'sm' && (
        <p className="text-xs text-muted-foreground">
          Fee: {confirmationFee.toString()} MSC tokens
        </p>
      )}
    </div>
  );
};
