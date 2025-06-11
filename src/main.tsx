import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.tsx";
import Signup from "./components/Signup.tsx";
import Dashboard from "./components/Dashboard.tsx";
import Navbar from "./components/Navbar.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AuthRoute from "./components/AuthRoute.tsx";
import Notfound from "./components/Notfound.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
