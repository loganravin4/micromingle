import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { QuickstartProvider } from "./Context";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuickstartProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </QuickstartProvider>
  </React.StrictMode>
);