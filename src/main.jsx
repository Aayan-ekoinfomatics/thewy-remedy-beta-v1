import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import './index.css'
import ScrollToTop from './helpers/scrollToTop'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <App />
        <ScrollToTop />
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
)

