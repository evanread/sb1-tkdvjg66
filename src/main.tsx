import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import App from './App.tsx';
import './index.css';

// Initialize Google Tag Manager
TagManager.initialize({
  gtmId: 'GTM-PCWFRBM9'
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);