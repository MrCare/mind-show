declare module 'mind-elixir' {
  interface MindElixirOptions {
    el: HTMLElement | string;
    direction?: number;
    draggable?: boolean;
    contextMenu?: boolean;
    toolBar?: boolean;
    nodeMenu?: boolean;
    keypress?: boolean;
    [key: string]: any;
  }

  interface MindElixirNode {
    topic: string;
    id?: string;
    children?: MindElixirNode[];
    [key: string]: any;
  }

  class MindElixir {
    static LEFT: number;
    static RIGHT: number;
    static SIDE: number;
    
    constructor(options: MindElixirOptions);
    
    init(data: any): void;
    install(plugin: any): void;
    destroy?(): void;
    
    static new(topic: string): any;
    
    [key: string]: any;
  }

  namespace MindElixir {
    type Direction = number;
  }

  export = MindElixir;
}

declare module '@mind-elixir/node-menu' {
  const NodeMenu: any;
  export default NodeMenu;
}
