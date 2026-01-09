import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OAuthSuccess from '../pages/OAuthSuccess';
import Onboarding from "@/pages/Onboarding";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { useActions } from "@/hooks/useActions";

const AppRouter = () => {
  const { isAuth, isLoading } = useSelector(state => state.auth);
  const { meAuth } = useActions()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      meAuth()
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>
          Завантаження...
        </p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={!isAuth ? <Login /> : <Navigate to="/onboarding" />}
      />
      <Route
        path="/register"
        element={!isAuth ? <Register /> : <Navigate to="/onboarding" />}
      />
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      <Route
        path="/onboarding"
        element={isAuth ? <Onboarding /> : <Navigate to="/login" />}
      />

      <Route
        path="*"
        element={<Navigate to={isAuth ? "/onboarding" : "/login"} />}
      />
    </Routes>
  );
};

export default AppRouter;