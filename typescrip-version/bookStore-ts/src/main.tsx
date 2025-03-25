import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render( //The exclamation is to indicate than wont be null at all
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

