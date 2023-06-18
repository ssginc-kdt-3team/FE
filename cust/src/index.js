import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

// axios.defaults.baseURL = 'http://10.10.10.67:8080';
axios.defaults.baseURL = 'https://www.teamyes.xyz';
// axios.defaults.baseURL = 'http://192.168.10.16:8080';
// axios.defaults.baseURL = 'http://localhost:8080';
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