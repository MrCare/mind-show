'use client';
/*
 * @Author: Mr.Car
 * @Date: 2025-07-16 14:11:12
 */
import Navigator from "@/components/Navigator";
import MindMap from "@/components/MindMap";

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
