import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'   // 1. CSS ko pehle import kiya taaki base classes pehle load ho jayein
import App from './App.jsx' // 2. App component ko baad me kiya taaki iske styles sabse upar rahein

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)