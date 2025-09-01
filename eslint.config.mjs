import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // 禁用 any 类型检查，因为第三方库类型定义不完整
      "@typescript-eslint/no-explicit-any": "off",
      // 禁用未使用变量警告（对于类型定义文件）
      "@typescript-eslint/no-unused-vars": "off",
      // 允许在某些情况下缺少依赖项
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
