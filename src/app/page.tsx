'use client';
/*
 * @Author: Mr.Car
 * @Date: 2025-07-16 14:11:12
 */
import dynamic from 'next/dynamic';
import { useRef, useState, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import Navigator from "@/components/Navigator";
import LoadingOverlay from "@/components/LoadingOverlay";
import NavigatorSkeleton from "@/components/skeletons/NavigatorSkeleton";
import MindMapSkeleton from "@/components/skeletons/MindMapSkeleton";
import MindMapPreviewSkeleton from "@/components/skeletons/MindMapPreviewSkeleton";
import type { MindMapRef } from "@/components/MindMap";

// 动态导入组件，禁用 SSR
const DynamicNavigator = dynamic(() => import("@/components/Navigator"), {
  ssr: false,
  loading: () => <NavigatorSkeleton />
});

const MindMap = dynamic(() => import("@/components/MindMap"), {
  ssr: false,
  loading: () => <MindMapSkeleton />
});

const MindMapPreview = dynamic(() => import("@/components/MindMapPreview"), {
  ssr: false,
  loading: () => <MindMapPreviewSkeleton />
});

// 全局加载状态管理，防止重复加载
const loadingState = {
  current: null as string | null,
  isLoading: false
};

// 带有搜索参数的主要内容组件
const HomeContent: React.FC = () => {
  const mindMapRef = useRef<MindMapRef>(null);
  const [mindMapInstance, setMindMapInstance] = useState<any>(null);
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  // 当 MindMap 实例准备好时的回调
  const handleInstanceReady = useCallback((instance: any) => {
    setMindMapInstance(instance);
  }, []);

  // 检查URL参数并加载数据
  useEffect(() => {
    const id = searchParams.get('id');
    
    // 如果没有ID，或者已经加载过这个ID，或者正在加载中，就不重复加载
    if (!id || id === loadingState.current || loadingState.isLoading) {
      return;
    }

    const loadMindMapData = async () => {
      loadingState.current = id;
      loadingState.isLoading = true;
      setIsLoading(true);
      
      try {
        const response = await fetch(`/api/mindmap/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Mind map not found');
          }
          throw new Error('Failed to load mind map data');
        }

        const result = await response.json();
        
        if (result.success && result.data.mindMapData) {
          setInitialData(result.data.mindMapData);
          toast.success('Mind map loaded successfully!');
        } else {
          throw new Error('Invalid mind map data');
        }
      } catch (error) {
        console.error('Error loading mind map:', error);
        loadingState.current = null;
        const errorMessage = error instanceof Error ? error.message : 'Failed to load mind map data';
        toast.error(errorMessage);
      } finally {
        loadingState.isLoading = false;
        setIsLoading(false);
      }
    };

    loadMindMapData();
  }, [searchParams]);

  return (
    <>
      <DynamicNavigator />
      <LoadingOverlay isLoading={isLoading} />
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Mind Map 部分 */}
        <div className="flex-1 flex overflow-hidden">
          <MindMap 
            ref={mindMapRef} 
            onInstanceReady={handleInstanceReady}
            initialData={initialData}
          />
        </div>
        
        {/* HTML Preview 部分 */}
        <div className="w-full lg:w-1/2 flex flex-col overflow-hidden p-4">
          <MindMapPreview mindMapInstance={mindMapInstance} />
        </div>
      </div>
    </>
  );
};

export default function Home() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Suspense fallback={
        <div className="h-screen flex flex-col overflow-hidden">
          <NavigatorSkeleton />
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            <div className="flex-1 flex overflow-hidden">
              <MindMapSkeleton />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col overflow-hidden p-4">
              <MindMapPreviewSkeleton />
            </div>
          </div>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </div>
  );
}
