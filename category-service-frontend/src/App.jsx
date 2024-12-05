import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Services from "./pages/Services";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  const isLoggedIn = !!localStorage.getItem("token"); // Check if the user is logged in

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Conditionally Render Navbar */}
        {isLoggedIn && <Navbar />}
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* Login Page */}
            <Route path="/" element={<Login />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories/:categoryId/services"
              element={
                <ProtectedRoute>
                  <Services />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4 text-center">
            <p>
              &copy; {new Date().getFullYear()} Admin Dashboard. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
