import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import { MenuProvider } from "./contexts/MenuContext";
import AuthProvider from "./contexts/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MenuProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route
              path="home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MenuProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
