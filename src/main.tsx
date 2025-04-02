
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
  // Remove any existing base element to avoid duplicates
  const existingBase = document.querySelector('base');
  if (existingBase) {
    existingBase.remove();
  }
  
  // Add a new base element with the correct href
  const baseElement = document.createElement('base');
  baseElement.setAttribute('href', baseUrl);
  document.head.insertBefore(baseElement, document.head.firstChild);
  
  // Log deployment information
  console.log(`Running in production mode with base URL: ${baseUrl}`);
}

createRoot(document.getElementById("root")!).render(<App />);
