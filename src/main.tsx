import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'; 
import { PersistGate } from 'redux-persist/integration/react'; 
import Modals from './pages/components/Modals.tsx'

let persistor = persistStore(store); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Modals />
      <App />
    </PersistGate>
    </Provider>
  </StrictMode>,
)
