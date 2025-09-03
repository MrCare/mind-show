'use client';
import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState, useCallback } from "react";
import MindElixir from "mind-elixir";
import MindMapHelp from "./MindMapHelp";
import "mind-elixir/style";

export interface MindMapRef {
  getInstance: () => any;
  loadData: (data: any) => void;
}

interface MindMapProps {
  onInstanceReady?: (instance: any) => void;
  initialData?: any;
}

const MindMap = forwardRef<MindMapRef, MindMapProps>(({ onInstanceReady, initialData }, ref) => {
  const me = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastLoadedData, setLastLoadedData] = useState<any>(null);

  useImperativeHandle(ref, () => ({
    getInstance: () => me.current,
    loadData: (data: any) => {
      if (me.current && data) {
        me.current.init(data);
      }
    }
  }));

  // 监听容器大小变化
  const updateContainerSize = useCallback(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setContainerSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  // 使用 ResizeObserver 监听容器大小变化
  useEffect(() => {
    updateContainerSize();

    const resizeObserver = new ResizeObserver(() => {
      updateContainerSize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateContainerSize]);

  // 初始化思维导图实例
  useEffect(() => {
    // 只有在容器大小确定且有足够大小时才初始化
    if (containerSize.width === 0 || containerSize.height === 0) {
      return;
    }

    // 如果已经初始化过，不重复初始化
    if (isInitialized) {
      return;
    }

    const instance = new MindElixir({
      el: "#mind-map",
      direction: MindElixir.RIGHT,
      draggable: true,
      contextMenu: true,
      toolBar: true,
      nodeMenu: true,
      keypress: true,
      expanded: true
    });
    
    // 创建示例思维导图数据
    const exampleData = {
      nodeData: {
        id: "root",
        topic: "Show Me Your Mind",
        root: true,
        children: [
          {
            id: "work",
            topic: "Work Projects",
            direction: 0,
            children: [
              { id: "project1", topic: "Web Development", direction: 0 },
              { id: "project2", topic: "Mobile App", direction: 0 },
              { id: "project3", topic: "Data Analysis", direction: 0 }
            ]
          },
          {
            id: "learning",
            topic: "Learning Plan",
            direction: 1,
            children: [
              { id: "skill1", topic: "Frontend Tech", direction: 1 },
              { id: "skill2", topic: "Backend Dev", direction: 1 },
              { id: "skill3", topic: "AI/ML", direction: 1 }
            ]
          },
          {
            id: "personal",
            topic: "Personal Goals",
            direction: 0,
            children: [
              { id: "goal1", topic: "Healthy Living", direction: 0 },
              { id: "goal2", topic: "Reading Plan", direction: 0 },
              { id: "goal3", topic: "Travel Plans", direction: 0 }
            ]
          }
        ]
      },
      linkData: {},
      summaryData: {}
    };
    
    // 初始化时使用默认数据
    instance.init(exampleData);
    me.current = instance;
    setIsInitialized(true);
    
    // 通知父组件实例已准备好
    if (onInstanceReady) {
      onInstanceReady(instance);
    }    
    console.log("MindElixir instance initialized");
  }, [containerSize, onInstanceReady, isInitialized]); // 添加 isInitialized 依赖

  // 处理外部数据加载
  useEffect(() => {
    if (initialData && me.current && initialData !== lastLoadedData) {
      me.current.init(initialData);
      setLastLoadedData(initialData);
      console.log("MindElixir data loaded from external source");
    }
  }, [initialData, lastLoadedData]); // 添加 lastLoadedData 依赖

  // 当容器大小变化时，调整思维导图大小
  useEffect(() => {
    if (me.current && containerSize.width > 0 && containerSize.height > 0) {
      // MindElixir 会自动适应容器大小，但可以手动触发重绘
      try {
        me.current.refresh();
      } catch (error) {
        console.log("Refresh not available, mind map will auto-adjust");
      }
    }
  }, [containerSize]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative"
      style={{ minHeight: '300px' }}
    >
      <div 
        id="mind-map" 
        className="w-full h-full"
      />
      {/* 帮助按钮 */}
      <MindMapHelp />
    </div>
  );
});

// MindMap.displayName = 'MindMap';

export default MindMap;