// # VITE CONFIGURATION
// Build tool configuration for the React frontend
// Defines plugins, base path, and build settings

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// # BUILD CONFIGURATION
// https://vite.dev/config/
// Configured for GitHub Pages deployment with custom base path
export default defineConfig({
  // # PLUGINS
  // React plugin for JSX support and hot reloading
  plugins: [react()],
  
  // # DEPLOYMENT SETTINGS
  // Base path for GitHub Pages deployment
  // Matches the repository name for proper routing
  base: '/KieuAI/',
})
