    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App.tsx';
    import './index.css';
    import { GoogleOAuthProvider } from '@react-oauth/google';

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <GoogleOAuthProvider clientId={"936342856446-d162ir6mr18h0o30divns5q9m7g3oei7.apps.googleusercontent.com"}>
          <App />
        </GoogleOAuthProvider>
      </React.StrictMode>
    );
    
