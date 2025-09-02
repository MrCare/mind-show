'use client';
/*
 * @Author: Mr.Car
 * @Date: 2025-07-16 14:11:12
 */
import dynamic from 'next/dynamic';
import { useRef, useState, useCallback } from 'react';
import Navigator from "@/components/Navigator";
import type { MindMapRef } from "@/components/MindMap";

// 动态导入 MindMap 组件，禁用 SSR
const MindMap = dynamic(() => import("@/components/MindMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-gray-500">
      Loading Mind Map...
    </div>
  )
});

// 动态导入 MindMapPreview 组件，禁用 SSR
const MindMapPreview = dynamic(() => import("@/components/MindMapPreview"), {
  ssr: false
});

export default function Home() {
  const mindMapRef = useRef<MindMapRef>(null);
  const [mindMapInstance, setMindMapInstance] = useState<any>(null);

  // 当 MindMap 实例准备好时的回调
  const handleInstanceReady = useCallback((instance: any) => {
    setMindMapInstance(instance);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigator />
      <div className="flex-1 flex">
        {/* Mind Map 部分 */}
        <div className="flex-1 flex items-center justify-center">
          <MindMap 
            ref={mindMapRef} 
            onInstanceReady={handleInstanceReady}
          />
        </div>
        
        {/* HTML Preview 部分 */}
        <div className="w-1/2 p-4 bg-white flex flex-col">
          <MindMapPreview 
            mindMapInstance={mindMapInstance} 
          />
        </div>
      </div>
    </div>
  );
}
