import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions } from "@/hooks/useActions";

import MainLayout from "@/layout/MainLayout";
import Home from "@/pages/Home";
import Onboarding from "@/pages/Onboarding";
import OAuthSuccess from '../pages/OAuthSuccess';
import OnboardingLayout from "@/layout/OnboardingLayout";
import Dormitories from "@/pages/Dormitories";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Loader from "@/components/Loader";
import CreateDormitoryPage from "@/pages/CreateDormitoryPage";
import DashboardLayout from "@/layout/DashboardLayout";
import DormitoryInfo from "@/pages/DormitoryInfo";
import DormitorySettings from "@/pages/DormitorySettings";
import Settlement from "@/pages/Settlement";

const DormitoryMembers = () => <div>Список мешканців</div>;
const RepairModule = () => <div>Модуль ремонту</div>;
const LaundryModule = () => <div>Модуль пральні</div>;
const PaymentModule = () => <div>Модуль оплати</div>;

const AppRouter = () => {
  const { isAuth, isLoading, memberships } = useSelector(state => state.auth);
  const { meAuth } = useActions();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      meAuth();
    }
  }, []);

  if (isLoading) return <Loader />;

  const authRedirectPath = memberships?.length > 0 ? "/dormitories" : "/onboarding";

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Route>

      <Route element={!isAuth ? <MainLayout /> : <Navigate to={authRedirectPath} replace />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={isAuth ? <OnboardingLayout /> : <Navigate to="/login" replace />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dormitories" element={<Dormitories />} />
        <Route path="/dormitories/create" element={<CreateDormitoryPage />}/>
      </Route>

      <Route path="/dashboard/:id" element={<DashboardLayout />}>
        <Route index element={<DormitoryInfo />} />
        <Route path="settlement" element={<Settlement />} />
        <Route path="settings" element={<DormitorySettings />}/>
        <Route path="members" element={<DormitoryMembers />} />
        <Route path="repairs" element={<RepairModule />} />
        <Route path="laundry" element={<LaundryModule />} />
        <Route path="payments" element={<PaymentModule />} />
      </Route>

      <Route path="*" element={<Navigate to={isAuth ? authRedirectPath : "/login"} replace />} />
    </Routes>
  );
};

export default AppRouter;