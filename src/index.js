import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BBSNav from 'layout/BBSNav';
import Footer from 'layout/Footer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <BBSNav />
      <App />
      <Footer />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
