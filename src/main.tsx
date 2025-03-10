import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'; 
import { PersistGate } from 'redux-persist/integration/react'; 
import Modals from './pages/components/Modals.tsx'
import { ClerkProvider } from '@clerk/clerk-react'

let persistor = persistStore(store); 

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// const PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/sign-in" afterSignInUrl={"/store"} afterSignUpUrl={"/store"}
    >
      <Modals />
      <App />
      </ClerkProvider>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
