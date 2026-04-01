
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="368455136328-gub1c5vtnmnhkl0k41ecgq67k6cm0p1v.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
)
