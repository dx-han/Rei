declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}

declare interface Window {
  luckysheet: {
    create: (options: {}) => void;
    // 根据需要添加更多luckysheet方法的类型定义
  };
}
