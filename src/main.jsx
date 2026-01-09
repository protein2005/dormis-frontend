import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>,
    </BrowserRouter>
  </Provider>
)
