// @ts-check
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'webpack.config.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  /** @type {import('eslint').Linter.Config} */
  {
    plugins: ['@ts-safeql/eslint-plugin'],
    rules: {
      '@ts-safeql/check-sql': [
        'error',
        {
          connections: [
            {
              connectionUrl: process.env.DATABASE_URL,
              // The migrations path:
              migrationsDir: './prisma/migrations',
              targets: [
                // This makes `prisma.$queryRaw` and `prisma.$executeRaw` commands linted
                {
                  tag: 'prisma.+($queryRaw|$executeRaw)',
                  transform: '{type}[]',
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
)
