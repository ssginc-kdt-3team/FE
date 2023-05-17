import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.withCredentials = true;

export const axiosWithToken = axios.create({
  baseURL: 'http://localhost:8080',
});

export const axiosForJson = axios.create({
  baseURL: 'http://localhost:3001',
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);