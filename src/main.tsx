
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Determine base URL for GitHub Pages
const isProd = import.meta.env.PROD;
const baseUrl = isProd ? '/zahrat-alnarjis-shop/' : '/';
document.documentElement.setAttribute('data-base-url', baseUrl);
document.documentElement.setAttribute('data-deployment', isProd ? 'prod' : 'dev');

// For GitHub Pages, we need to ensure relative paths are used for scripts and assets
if (isProd) {
  // This helps ensure that relative paths are properly resolved
  document.querySelector('base')?.setAttribute('href', baseUrl);
}

createRoot(document.getElementById("root")!).render(<App />);
