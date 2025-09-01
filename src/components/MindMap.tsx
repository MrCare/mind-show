'use client';
import React, { useEffect, useRef } from "react";
import MindElixir from "mind-elixir";
import "mind-elixir/style";

const MindMap = () => {
  const me = useRef<any>(null);

  // 初始化思维导图
  useEffect(() => {
    const instance = new MindElixir({
      el: "#mind-map",
      direction: MindElixir.SIDE,
      draggable: true,
      contextMenu: true,
      toolBar: true,
      nodeMenu: true,
      keypress: true,
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
  }, []);

  return (
    <div 
      id="mind-map" 
      style={{ 
        height: "calc(100vh - 128px)", 
        width: "100%" 
      }} 
    />
  );
};

export default MindMap;