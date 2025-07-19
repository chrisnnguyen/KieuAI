// # REACT ENTRY POINT
// Main entry point for the React application
// Imports React and sets up the root component

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// # APP RENDERING
// Creates and renders the root React component with StrictMode
// StrictMode helps detect potential problems during development
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
