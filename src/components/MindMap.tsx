'use client';
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import MindElixir from "mind-elixir";
import "mind-elixir/style";

export interface MindMapRef {
  getInstance: () => any;
}

interface MindMapProps {
  onInstanceReady?: (instance: any) => void;
}

const MindMap = forwardRef<MindMapRef, MindMapProps>(({ onInstanceReady }, ref) => {
  const me = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getInstance: () => me.current
  }));

  // 初始化思维导图
  useEffect(() => {
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
    
    instance.init(exampleData);
    me.current = instance;
    
    // 通知父组件实例已准备好
    if (onInstanceReady) {
      onInstanceReady(instance);
    }    
    console.log("MindElixir instance:", instance.getDataString());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div 
      id="mind-map" 
      style={{ 
        height: "calc(100vh - 96px)", 
        width: "calc(50vw - 32px)" 
      }} 
    />
  );
});

// MindMap.displayName = 'MindMap';

export default MindMap;