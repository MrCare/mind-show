import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // 禁用严格模式以解决MindElixir兼容性问题
};

export default nextConfig;
