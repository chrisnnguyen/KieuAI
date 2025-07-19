// # ESLINT CONFIGURATION
// Code linting and formatting rules for the React frontend
// Ensures code quality and consistency across the project

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// # LINTING CONFIGURATION
// Define ESLint rules and settings for JavaScript/JSX files
export default defineConfig([
  // # GLOBAL IGNORES
  // Ignore build output directory
  globalIgnores(['dist']),
  
  // # JAVASCRIPT/JSX RULES
  // Configuration for all JavaScript and JSX files
  {
    files: ['**/*.{js,jsx}'],
    
    // # EXTENDED CONFIGURATIONS
    // Use recommended configurations from various plugins
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    
    // # LANGUAGE OPTIONS
    // ECMAScript version and parser settings
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    
    // # CUSTOM RULES
    // Project-specific linting rules
    rules: {
      // Allow unused variables that start with uppercase (common for React components)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
