import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/index.js';
import { ToastContainer } from 'react-toastify';
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer  position="top-center"/>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
