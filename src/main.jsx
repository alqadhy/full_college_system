import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// MAIN APP COMPONENT
import App from './App.jsx';

// REACT ROUTER Library
import { BrowserRouter } from 'react-router-dom';

// i18next Library
import { initI18n } from './i18n/index.js';

await initI18n();

// RENDERING THE APP  
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
