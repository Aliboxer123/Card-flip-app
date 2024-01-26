import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import CardContext from './Components/context.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CardContext>
      <App />
    </CardContext>
  </React.StrictMode>,
)
