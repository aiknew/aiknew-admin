import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import eslint from "@eslint/js"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import tseslint from "typescript-eslint"

import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript"
import pluginVue from "eslint-plugin-vue"
import pluginVitest from "@vitest/eslint-plugin"
import pluginPlaywright from "eslint-plugin-playwright"
import vueParser from 'vue-eslint-parser'

export default defineConfig([
  globalIgnores(["**/node_modules/", "**/dist/", "**/tsconfig.json"]),

  // admin-api eslint configuration
  {
    name: "admin-api",
    basePath: ".",
    files: ["./apps/admin-api/**/*.ts", "./shared/api/**/*.ts"],
    ignores: [
      "**/logs/**",
      "**/public/**",
      "shared/api/types/**",
      "shared/api/permission-sync/**",
      "shared/api/db/admin-db/src/generated/**"
    ],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: "commonjs",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          vars: "all",
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  // admin-ui eslint configuration
  {
    name: "admin-ui",
    basePath: ".",
    files: [ "./apps/admin-ui/**/*", "./shared/ui/**/*"],
    ignores: ["apps/admin-ui/src/types/open-api.ts", "shared/ui/types/**"],
    extends: [
      defineConfigWithVueTs(
        {
          name: "app/files-to-lint",
          files: ["**/*.{ts,mts,tsx,vue}"],
        },

        globalIgnores(["**/dist/**", "**/dist-ssr/**", "**/coverage/**"]),

        pluginVue.configs["flat/essential"],
        vueTsConfigs.recommended,

        {
          ...pluginVitest.configs.recommended,
          files: ["src/**/__tests__/*"],
        },

        {
          ...pluginPlaywright.configs["flat/recommended"],
          files: ["e2e/**/*.{test,spec}.{js,ts,jsx,tsx}"],
        },
      ),

      eslintPluginPrettierRecommended,
    ],
  },

  // support tsx/jsx in vue SFC
  {
    name: 'ui-tsx-support',
    basePath: ".",
    files: [ "./apps/admin-ui/**/*", "./shared/ui/**/*"],
    extends: [
      {
        files: ['*.vue', '**/*.vue'],
        languageOptions: {
          parser: vueParser,
          parserOptions: {
            parse: {
              js: 'espree',
              jsx: 'espree',
              ts: tseslint.parser,
              tsx: tseslint.parser,
            },
            ecmaVersion: 2024,
            ecmaFeatures: {
              jsx: true,
            },
            extraFileExtensions: ['.vue'],
          },
        },
        rules: {
          'vue/block-lang': [
            'error',
            {
              script: {
                lang: ['jsx', 'tsx', 'js','ts'],
              },
            },
          ],
        },
      },
    ]
  },

  // shared packages (exclude shared/api/ adn shared/ui/)
  {
    name: "shared-packages",
    basePath: ".",
    files: ["./shared/**/*.ts"],
    ignores: [
      "./shared/api/**/*",
      "./shared/ui/**/*",
      "./shared/types/**/*"
    ],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
