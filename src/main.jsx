import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Production builds are prerendered (scripts/prerender.js); the dev server starts empty.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app)
} else {
  ReactDOM.createRoot(container).render(app)
}
