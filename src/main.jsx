// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router";
import { SearchContextProvider } from "./context/searchContext";
import { AuthContextProvider } from "./context/authContext";
import.meta.env;
// import dotenv from "dotenv";

// dotenv.config();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchContextProvider>
        <AuthContextProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthContextProvider>
      </SearchContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
