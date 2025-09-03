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
  const [isLoading, setIsLoading] = useState(false);
  const previewRef = useRef<HTMLIFrameElement>(null);
  const { address } = useAccount();

  // 生成HTML内容
  const generateHTML = async () => {
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
          address: address || null // 传入当前钱包地址
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate HTML');
      }

      const result = await response.json();
      
      if (result.success) {
        setHtmlContent(result.html);
        setHtmlId(result.id);
        console.log('HTML saved with ID:', result.id);
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error generating HTML:', error);
      setHtmlContent('<p>Error generating HTML from mind map</p>');
    } finally {
      setIsLoading(false);
    }
  };

  // 发布成功的回调函数
  const handlePublishSuccess = () => {
    console.log('Mind map published to blockchain successfully!');
    // 可以在这里添加更多成功后的逻辑，比如更新UI状态
  };

  return (
    <Card className="w-full h-full flex flex-col p-0 gap-0">
      <CardHeader className="flex-shrink-0 pb-2 px-3 pt-3">
        <CardTitle className="flex items-center justify-between text-sm">
          Presentation Preview
          <div className="flex gap-1">
            {!htmlContent ? (
              <Button 
                onClick={generateHTML} 
                disabled={isLoading}
                variant="outline"
                size="sm"
                className="h-7 px-2 text-xs"
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
            ) : (
              <>
                <Button 
                  onClick={generateHTML} 
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs"
                >
                  {isLoading ? 'Generating...' : 'Regenerate'}
                </Button>
                {htmlId && (
                  <PublishButton
                    mindMapId={htmlId}
                    onPublishSuccess={handlePublishSuccess}
                    disabled={isLoading}
                    size="sm"
                    variant="default"
                  />
                )}
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-3 pt-0">
        {htmlContent ? (
          <div className="h-full flex flex-col">
            {/* HTML 预览区域 */}
            <div className="flex-1 min-h-0">
              <iframe
                ref={previewRef}
                className="w-full h-full border bg-white rounded"
                srcDoc={htmlContent}
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-xs">
            Click &quot;Generate&quot; to convert your mind map to HTML format
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MindMapPreview;
