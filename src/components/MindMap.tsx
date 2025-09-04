'use client';
import React, { useEffect, useRef, forwardRef, useImperativeHandle, useState, useCallback } from "react";
import MindElixir from "mind-elixir";
import MindMapHelp from "./MindMapHelp";
import { useTheme } from "next-themes";
import "mind-elixir/style";
import "@/styles/mindmap-theme.css";

export interface MindMapRef {
  getInstance: () => any;
  loadData: (data: any) => void;
  scaleFit: () => void;
}

interface MindMapProps {
  onInstanceReady?: (instance: any) => void;
  initialData?: any;
}

// 自定义主题配置
const createCustomTheme = (isDark: boolean) => ({
  name: isDark ? 'MindShow Dark' : 'MindShow Light',
  palette: [
    '#8B5CF6', // purple-500 - primary
    '#06B6D4', // cyan-500 
    '#10B981', // emerald-500
    '#F59E0B', // amber-500
    '#EF4444', // red-500
    '#EC4899', // pink-500
    '#6366F1', // indigo-500
    '#84CC16', // lime-500
    '#F97316', // orange-500
    '#8B5CF6', // purple-500 back to start
  ],
  cssVar: {
    // 主要颜色配置
    '--main-color': isDark ? '#F8FAFC' : '#1E293B', // text color
    '--main-bgcolor': isDark ? '#0F172A' : '#FFFFFF', // main background
    '--color': isDark ? '#CBD5E1' : '#64748B', // secondary text
    '--bgcolor': isDark ? '#1E293B' : '#F8FAFC', // secondary background
    
    // 面板颜色
    '--panel-color': isDark ? '#F8FAFC' : '#1E293B',
    '--panel-bgcolor': isDark ? '#1E293B' : '#FFFFFF',
    '--panel-border-color': isDark ? '#334155' : '#E2E8F0',
    
    // 连接线颜色
    '--line-color': isDark ? '#475569' : '#94A3B8',
    '--line-root-color': '#8B5CF6', // primary color for root connections
    
    // 节点样式
    '--node-border-color': isDark ? '#475569' : '#CBD5E1',
    '--node-shadow': isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
    
    // 选中状态
    '--select-color': '#8B5CF6',
    '--select-bgcolor': isDark ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.1)',
    
    // 工具栏
    '--toolbar-bgcolor': isDark ? '#1E293B' : '#FFFFFF',
    '--toolbar-border-color': isDark ? '#334155' : '#E2E8F0',
  }
});

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
  const { theme, systemTheme } = useTheme();
  
  // 确定当前主题
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  useImperativeHandle(ref, () => ({
    getInstance: () => me.current,
    loadData: (data: any) => {
      if (me.current && data) {
        me.current.init(data);
        
        // 数据加载后自动缩放到合适大小
        setTimeout(() => {
          if (me.current?.scaleFit) {
            me.current.scaleFit();
            console.log("Mind map scaled to fit after loadData");
          }
        }, 100);
      }
    },
    scaleFit: () => {
      if (me.current?.scaleFit) {
        me.current.scaleFit();
        console.log("Mind map scaled to fit via ref method");
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
      expanded: true,
      theme: createCustomTheme(isDark)
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
    
    // 初始化完成后自动缩放到合适大小
    setTimeout(() => {
      if (instance.scaleFit) {
        instance.scaleFit();
        console.log("Mind map scaled to fit");
      }
    }, 100);
    
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

  // 监听主题变化并应用新主题
  useEffect(() => {
    if (me.current) {
      const customTheme = createCustomTheme(isDark);
      try {
        me.current.changeTheme(customTheme);
        console.log(`Theme changed to: ${isDark ? 'dark' : 'light'}`);
      } catch (error) {
        console.log("Theme change not available");
      }
    }
  }, [isDark]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative bg-background"
      style={{ minHeight: '300px' }}
    >
      <div 
        id="mind-map" 
        className="w-full h-full p-4"
      />
      {/* 帮助按钮 */}
      <MindMapHelp />
    </div>
  );
});

// MindMap.displayName = 'MindMap';

export default MindMap;