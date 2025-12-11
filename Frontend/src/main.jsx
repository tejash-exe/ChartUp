import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Providers
import { AppProvider } from './context/AppContext.jsx';
import { NotificationProvider } from "./context/NotificationContext.jsx";
// Packages
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { GoogleOAuthProvider } from '@react-oauth/google';
// CSS
import './index.css';
// Pages
import App from './pages/App.jsx';
import Welcome from './pages/Welcome.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <NotificationProvider>
        <GoogleOAuthProvider clientId='666770854160-9eksp6bu26gi1kjbp8jrgc96agdo8rho.apps.googleusercontent.com'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="*" element={<Navigate to="/welcome" replace />} />
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </NotificationProvider>
    </AppProvider>
  </StrictMode>,
);