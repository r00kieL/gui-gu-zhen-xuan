import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import vueParser from "vue-eslint-parser";

export default defineConfig([
  { ignores: ["dist", "node_modules"] },

  // JS 基础
  js.configs.recommended,

  // Vue 的 flat 配置
  pluginVue.configs["flat/essential"],

  // TS
  ...tseslint.configs.recommended,

  // 你自己的规则块
  {
    files: ["**/*.{js,cjs,mjs,ts,cts,mts,vue}"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        ...globals.es2021,
      },
    },
    // 这里要把 vue 也挂上
    plugins: {
      vue: pluginVue,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "no-var": "error",
      "no-multiple-empty-lines": ["warn", { max: 1 }],
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-unexpected-multiline": "error",
      "no-useless-escape": "off",

      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/semi": "off",

      // 你之前想要的这条就能识别了
      "vue/multi-word-component-names": "off",
      "vue/no-mutating-props": "off",
      "vue/attribute-hyphenation": "off",

      "prettier/prettier": "error",
    },
  },
]);
