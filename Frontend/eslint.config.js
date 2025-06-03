import js from "@eslint/js";
import eslintPluginVue from "eslint-plugin-vue";
import ts from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default ts.config(
  // 1. 继承推荐规则
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginVue.configs["flat/recommended"],

  // 2. Vue 文件的 TypeScript 解析配置
  {
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"] // 明确支持 .vue 文件
      }
    }
  },

  // 3. 全局规则 (统一格式化和代码风格)
  {
    files: ["**/*.{js,ts,vue}"],
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      // --- Vue 专用规则 ---
      "vue/singleline-html-element-content-newline": [
        "error",
        {
          ignoreWhenNoAttributes: true,
          ignoreWhenEmpty: true,
          ignores: ["slot", "template"] // 关键配置：忽略这些标签  // [!code focus]
        }
      ],
      "vue/multi-word-component-names": "off", // 允许单单词组件名
      "vue/block-order": [
        "error",
        {
          order: ["template", "script", "style"]
        }
      ],
      "vue/no-v-text-v-html-on-component": "off",
      "vue/max-attributes-per-line": "off", // 交给 Prettier 处理
      "vue/html-closing-bracket-newline": "off", // 交给 Prettier 处理
      "vue/html-indent": ["error", 2], // 缩进 2 空格（与 Prettier 一致）
      "vue/html-self-closing": [
        // 自闭合标签规则
        "error",
        {
          html: {
            void: "always", // 比如 <img />
            normal: "never", // 比如 <div></div>
            component: "always" // 比如 <MyComponent />
          },
          svg: "always",
          math: "always"
        }
      ],

      // --- Prettier 格式化规则（核心配置） ---
      "prettier/prettier": [
        "error",
        {
          printWidth: 100,
          tabWidth: 2,
          useTabs: false,
          semi: true,
          singleQuote: false,
          trailingComma: "none",
          bracketSpacing: true, // 对象花括号加空格: { foo: bar }
          bracketSameLine: true, // 标签 > 不换行（与 Vue 3 风格一致）
          arrowParens: "avoid", // 箭头函数单参数省略括号
          endOfLine: "lf", // 强制 Unix 换行符
          vueIndentScriptAndStyle: false, // 不缩进 <script> 和 <style>
          htmlWhitespaceSensitivity: "ignore", // 避免 HTML 空格问题
          // 文件覆盖规则
          overrides: [
            {
              files: "*.json",
              options: { printWidth: 60 }
            },
            {
              files: "*.md",
              options: { proseWrap: "always", printWidth: 80 }
            }
          ]
        }
      ],

      // --- TypeScript 补充规则 ---
      "@typescript-eslint/no-unused-vars": "warn", // 未用变量警告
      "@typescript-eslint/no-explicit-any": "warn" // 避免 any 类型
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021 // 支持现代 ES 全局变量
      }
    }
  }
);
