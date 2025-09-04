'use client';
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublishButton } from './PublishButton';
import { useAccount } from 'wagmi';

interface MindMapPreviewProps {
  mindMapInstance?: any;
}

const MindMapPreview: React.FC<MindMapPreviewProps> = ({ mindMapInstance }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [htmlId, setHtmlId] = useState<number | null>(null);
  const [fullHtmlId, setFullHtmlId] = useState<number | null>(null); // 完整版本的ID
  const [isLoading, setIsLoading] = useState(false);
  const previewRef = useRef<HTMLIFrameElement>(null);
  const { address } = useAccount();

  // 生成HTML内容
  const generateHTML = async (isPreview: boolean = true) => {
    if (!mindMapInstance) {
      setHtmlContent('<p>Mind map not available</p>');
      return;
    }

    setIsLoading(true);
    
    try {
      // 获取思维导图数据
      const mindData = mindMapInstance.getData();
      
      // 调用后端API生成HTML
      const response = await fetch('/api/generate-html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          mindData,
          address: address || null, // 传入当前钱包地址
          previewMode: isPreview // 添加预览模式参数
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate HTML');
      }

      const result = await response.json();
      
      if (result.success) {
        if (isPreview) {
          setHtmlContent(result.html);
          setHtmlId(result.id);
        } else {
          // 为发布生成完整版本
          setFullHtmlId(result.id);
        }
        console.log('HTML saved with ID:', result.id);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error generating HTML:', error);
      setHtmlContent('__ERROR__'); // 用特殊标记表示错误
    } finally {
      setIsLoading(false);
    }
  };

  // 发布成功的回调函数
  const handlePublishSuccess = () => {
    console.log('Mind map published to blockchain successfully!');
    // 可以在这里添加更多成功后的逻辑，比如更新UI状态
  };

  // 处理发布按钮点击
  const handlePublishClick = async () => {
    if (!mindMapInstance) return;
    
    try {
      setIsLoading(true);
      // 获取思维导图数据
      const mindData = mindMapInstance.getData();
      
      // 更新现有记录为完整版本（非预览模式）
      const response = await fetch('/api/generate-html', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          mindData,
          address: address || null,
          previewMode: false, // 生成完整版本
          updateId: htmlId // 更新现有的预览记录
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate full version');
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('Full version updated for ID:', result.id);
        // 更新fullHtmlId以便PublishButton使用
        setFullHtmlId(result.id);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error generating full version:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col p-0 gap-0">
      <CardHeader className="flex-shrink-0 pb-2 px-3 pt-3">
        <CardTitle className="flex items-center justify-between text-sm">
          Presentation Preview
          <div className="flex gap-1">
            {!htmlContent ? (
              <Button 
                onClick={() => generateHTML(true)} 
                disabled={isLoading || !address}
                variant="default"
                size="sm"
                className="h-7 px-2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                title={!address ? 'Please connect your wallet first' : ''}
              >
                {isLoading ? 'Generating...' : !address ? 'Connect Wallet to Generate' : 'Generate Preview'}
              </Button>
            ) : (
              <>
                <Button 
                  onClick={() => generateHTML(true)} 
                  disabled={isLoading || !address}
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  title={!address ? 'Please connect your wallet first' : ''}
                >
                  {isLoading ? 'Generating...' : 'Regenerate Preview'}
                </Button>
                {htmlId && (
                  <PublishButton
                    mindMapId={fullHtmlId || htmlId} // 优先使用完整版本ID
                    onPublishSuccess={handlePublishSuccess}
                    disabled={isLoading}
                    size="sm"
                    variant="default"
                    onPublishClick={handlePublishClick} // 添加发布前的处理
                  />
                )}
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-3 pt-0">
        {htmlContent && htmlContent !== '__ERROR__' ? (
          <div className="h-full flex flex-col">
            {/* HTML 预览区域 */}
            <div className="flex-1 min-h-0">
              <iframe
                ref={previewRef}
                className="w-full h-full border bg-white rounded"
                srcDoc={htmlContent}
                sandbox="allow-same-origin allow-scripts"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center shadow-sm">
              <svg 
                className="w-8 h-8 text-primary" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-slate-700">
                {htmlContent === '__ERROR__' ? 'Error Generating Preview' : 'No Preview Available'}
              </h3>
              <p className="text-xs text-slate-500 max-w-48 leading-relaxed">
                {htmlContent === '__ERROR__' ? (
                  <>Failed to generate HTML from mind map. Please try again or check your data.</>
                ) : (
                  !address ? (
                    <>Connect your wallet first, then click the <span className="font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">&quot;Generate&quot;</span> button to convert your mind map into a beautiful HTML presentation</>
                  ) : (
                    <>Click the <span className="font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded">&quot;Generate&quot;</span> button above to convert your mind map into a beautiful HTML presentation</>
                  )
                )}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MindMapPreview;
