'use client';
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MindMapPreviewProps {
  mindMapInstance?: any;
}

const MindMapPreview: React.FC<MindMapPreviewProps> = ({ mindMapInstance }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [htmlId, setHtmlId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const previewRef = useRef<HTMLIFrameElement>(null);

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
        body: JSON.stringify({ mindData }),
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

  // 发布HTML内容
  const publishHTML = () => {
    if (htmlId) {
      // 生成查看链接
      const viewUrl = `/api/view/${htmlId}`;
      
      // 在新窗口中打开查看页面
      window.open(viewUrl, '_blank');
      
      console.log('Publishing HTML with ID:', htmlId);
      console.log('View URL:', viewUrl);
    } else {
      alert('Please generate HTML first');
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center justify-between text-sm">
          Mind Map HTML Preview
          <div className="flex gap-2">
            {!htmlContent ? (
              <Button 
                onClick={generateHTML} 
                disabled={isLoading}
                variant="outline"
                size="sm"
              >
                {isLoading ? 'Generating...' : 'Generate HTML'}
              </Button>
            ) : (
              <>
                <Button 
                  onClick={generateHTML} 
                  disabled={isLoading}
                  variant="outline"
                  size="sm"
                >
                  {isLoading ? 'Generating...' : 'Regenerate'}
                </Button>
                <Button 
                  onClick={publishHTML} 
                  variant="default"
                  size="sm"
                >
                  Publish
                </Button>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        {htmlContent ? (
          <div className="h-full flex flex-col">
            {/* HTML 预览区域 - 固定高度，防止布局被破坏 */}
            <div className="flex-1 min-h-0">
              <div className="text-xs text-gray-500 mb-2">HTML Preview:</div>
              <iframe
                ref={previewRef}
                className="w-full h-full border rounded-lg bg-white"
                srcDoc={htmlContent}
                style={{
                  minHeight: '300px',
                  maxHeight: 'calc(100% - 16px)', // 减去预览区域的高度100%
                }}
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            Click &quot;Generate HTML&quot; to convert your mind map to HTML format
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MindMapPreview;
