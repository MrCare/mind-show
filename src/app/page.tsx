'use client';
/*
 * @Author: Mr.Car
 * @Date: 2025-07-16 14:11:12
 */
import dynamic from 'next/dynamic';
import Navigator from "@/components/Navigator";

// 动态导入 MindMap 组件，禁用 SSR
const MindMap = dynamic(() => import("@/components/MindMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-gray-500">
      Loading Mind Map...
    </div>
  )
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigator />
      <div className="flex-1 flex items-center justify-center p-8">
        <MindMap />
      </div>
    </div>
  );
}
