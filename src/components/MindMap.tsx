import React, { useEffect, useRef, forwardRef, ForwardedRef } from "react";
import MindElixir from "mind-elixir";
import "mind-elixir/style";

// 定义组件支持的属性类型
interface MindMapProps {
  /** 思维导图容器高度 */
  height?: string;
  /** 思维导图容器宽度 */
  width?: string;
  /** 思维导图扩展方向 */
  direction?: MindElixir.Direction;
  /** 是否允许拖拽节点 */
  draggable?: boolean;
  /** 是否启用右键菜单 */
  contextMenu?: boolean;
  /** 是否显示工具栏 */
  toolBar?: boolean;
  /** 是否启用节点菜单 */
  nodeMenu?: boolean;
  /** 是否启用键盘快捷键 */
  keypress?: boolean;
  /** 初始主题文本（仅在没有提供initialData时使用） */
  initialTopic?: string;
  /** 初始思维导图数据（完整的思维导图结构） */
  initialData?: any;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// 使用forwardRef创建可传递ref的组件
const MindMap = forwardRef((props: MindMapProps, ref: ForwardedRef<MindElixir | null>) => {
  // 存储DOM容器的引用
  const mapContainer = useRef<HTMLDivElement>(null);
  // 存储MindElixir实例
  const mindInstance = useRef<MindElixir | null>(null);
  
  // 解构props并设置默认值
  const {
    height = "calc(100vh - 128px)",
    width = "100%",
    direction = MindElixir.SIDE,
    draggable = true,
    contextMenu = true,
    toolBar = true,
    nodeMenu = true,
    keypress = true,
    initialTopic = "Show Me Your Mind",
    initialData,
    className = "",
    style = {}
  } = props;

  // 创建默认的思维导图数据
  const getDefaultData = () => {
    if (initialData) {
      return initialData;
    }
    
    // 如果没有提供initialData，创建一个带有示例子节点的默认结构
    return {
      nodeData: {
        id: "root",
        topic: initialTopic,
        root: true,
        children: [
          {
            id: "idea1",
            topic: "Core Ideas",
            direction: 0,
            children: [
              { id: "detail1", topic: "Detailed Description", direction: 0 },
              { id: "detail2", topic: "Implementation Plan", direction: 0 }
            ]
          },
          {
            id: "idea2", 
            topic: "Related Concepts",
            direction: 1,
            children: [
              { id: "concept1", topic: "Key Elements", direction: 1 },
              { id: "concept2", topic: "Important Notes", direction: 1 }
            ]
          },
          {
            id: "idea3",
            topic: "Action Plan", 
            direction: 0,
            children: [
              { id: "action1", topic: "Step One", direction: 0 },
              { id: "action2", topic: "Step Two", direction: 0 }
            ]
          }
        ]
      },
      linkData: {},
      summaryData: {}
    };
  };

  // 初始化思维导图
  useEffect(() => {
    // 确保容器已存在且还没有初始化过
    if (!mapContainer.current || mindInstance.current) return;

    // 延迟初始化以避免React严格模式问题
    const timer = setTimeout(() => {
      if (!mapContainer.current || mindInstance.current) return;
      
      try {
        // 清空容器内容，确保干净的初始状态
        mapContainer.current.innerHTML = '';
        
        // 创建实例
        const instance = new MindElixir({
          el: mapContainer.current!,
          direction,
          draggable,
          contextMenu,
          toolBar,
          nodeMenu,
          keypress,
        });

        // 初始化数据
        const dataToInit = getDefaultData();
        instance.init(dataToInit);
        
        // 存储实例引用
        mindInstance.current = instance;
        
        // 将实例通过ref暴露给父组件
        if (typeof ref === "function") {
          ref(instance);
        } else if (ref) {
          ref.current = instance;
        }
      } catch (error) {
        console.error("MindElixir initialization error:", error);
      }
    }, 100);

    // 清理函数
    return () => {
      clearTimeout(timer);
      // 清理引用
      mindInstance.current = null;
      if (ref && typeof ref !== "function") {
        ref.current = null;
      }
      // 如果MindElixir有销毁方法，可以在这里调用
      // instance.destroy?.();
    };
  }, [
    direction, 
    draggable, 
    contextMenu, 
    toolBar, 
    nodeMenu, 
    keypress,
    initialTopic,
    initialData
  ]);

  // 合并内联样式和外部传入的样式
  const containerStyle: React.CSSProperties = {
    height,
    width,
    ...style
  };

  return (
    <div
      ref={mapContainer}
      className={className}
      style={containerStyle}
    />
  );
});

// 设置组件显示名称
MindMap.displayName = "MindMap";

export default MindMap;