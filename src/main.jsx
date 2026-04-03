import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Removing strict mode to avoid double-renders which can mess with tight socket/timer logic while developing
  // React.StrictMode is fine for prod
  <App />
)
