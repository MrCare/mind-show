'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export const CustomConnectButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 在客户端挂载前显示占位符
  if (!isMounted) {
    return (
      <Button disabled className="text-sm px-4 py-2">
        Loading...
      </Button>
    );
  }

  return <CustomConnectButtonContent />;
};

const CustomConnectButtonContent = () => {
  const { theme } = useTheme();
  
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // 注意：如果您的应用程序使用 SSR，需要先检查 mounted 状态
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            className="flex items-center justify-center"
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button 
                    onClick={openConnectModal} 
                    variant="default" 
                    size="default"
                    className="flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-xs sm:text-sm px-2 sm:px-4"
                  >
                    <span className="hidden sm:inline">Connect Wallet</span>
                    <span className="sm:hidden">Connect</span>
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button 
                    onClick={openChainModal} 
                    variant="destructive" 
                    size="default"
                    className="flex items-center justify-center animate-pulse text-xs sm:text-sm px-2 sm:px-4"
                  >
                    <span className="hidden sm:inline">Wrong network</span>
                    <span className="sm:hidden">Wrong net</span>
                  </Button>
                );
              }

              return (
                <div className="flex items-center justify-center gap-1 sm:gap-2">
                  {/* 网络按钮 - 在移动端简化显示 */}
                  <Button
                    onClick={openChainModal}
                    variant="ghost"
                    size="sm"
                    className="flex items-center justify-center gap-1 sm:gap-2 hover:bg-accent hover:text-accent-foreground transition-colors text-xs sm:text-sm px-1 sm:px-3"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 2,
                        }}
                        className="sm:w-5 sm:h-5 sm:mr-1"
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            width={20}
                            height={20}
                            style={{ width: '100%', height: '100%' }}
                          />
                        )}
                      </div>
                    )}
                    <span className="hidden sm:inline">{chain.name}</span>
                    <span className="sm:hidden">{chain.name?.slice(0, 3)}</span>
                  </Button>

                  <Button
                    onClick={openAccountModal}
                    variant="secondary"
                    size="default"
                    className="flex items-center justify-center bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors text-xs sm:text-sm px-2 sm:px-4"
                  >
                    <span className="hidden sm:inline">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </span>
                    <span className="sm:hidden">
                      {account.displayName?.slice(0, 6)}...
                    </span>
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
