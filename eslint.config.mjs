import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import eslint from "@eslint/js"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["**/node_modules/", "**/dist/", "**/tsconfig.json"]),

  // admin-api eslint
  {
    name: "admin-api",
    basePath: ".",
    files: ["./apps/admin-api/**/*.ts", "./shared/api/**/*.ts"],
    ignores: [
      "**/logs/**",
      "**/public/**",
      "shared/api/types/**",
      "shared/api/permission-sync/**",
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
        project: [
          "./apps/admin-api/tsconfig.build.json",
          "shared/api/**/tsconfig.json",
        ],
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
])
