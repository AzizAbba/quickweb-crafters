
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Determine base URL for GitHub Pages
const isProd = import.meta.env.PROD;
const baseUrl = isProd ? '/quickweb-crafters/' : '/';

// Set the base URL as a data attribute for access throughout the app
document.documentElement.setAttribute('data-base-url', baseUrl);
document.documentElement.setAttribute('data-deployment', isProd ? 'prod' : 'dev');

// For GitHub Pages, we need to ensure paths are properly resolved
if (isProd) {
  // Update base href for all resources
  const baseElement = document.querySelector('base') || document.createElement('base');
  baseElement.setAttribute('href', baseUrl);
  
  if (!document.querySelector('base')) {
    document.head.appendChild(baseElement);
  }
  
  // Log deployment information
  console.log(`Running in production mode with base URL: ${baseUrl}`);
}

createRoot(document.getElementById("root")!).render(<App />);
