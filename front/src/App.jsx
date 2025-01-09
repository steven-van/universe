import React from 'react';
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="login" element={<Login/>}/>
      <Route path="home" element={<Home/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
