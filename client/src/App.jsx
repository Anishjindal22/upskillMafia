import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Header from "./layout/Header";
import "./App.css";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));
const App = () => {
  const user = true;
  return (
    <>
      <Header />
      <Routes>
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route
          path="/login"
          element={
            <ProtectedRoute user={!user} redirect="/">
              <Login />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
