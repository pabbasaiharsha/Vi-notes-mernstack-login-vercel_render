
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.client_id}>
    <App />
  </GoogleOAuthProvider>
)
