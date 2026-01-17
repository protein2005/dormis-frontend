import React, { useEffect, useState } from 'react';
import {
  NavLink,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
  Link
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  LayoutDashboard,
  Users,
  Wrench,
  WashingMachine,
  CreditCard,
  LogOut,
  Building2,
  Menu,
  X
} from 'lucide-react';

import { useActions } from "@/hooks/useActions";
import './DashboardLayout.scss';
import UserProfile from "@/components/UserProfile";

const DashboardLayout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { getDormitoryById } = useActions();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { currentDorm, isLoading } = useSelector((state) => state.dormitory);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) getDormitoryById(id);
  }, [id, getDormitoryById]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleGoBack = () => navigate('/dormitories');

  const menuItems = [
    { path: `/dashboard/${id}`, icon: <LayoutDashboard size={20} />, label: 'Головна' },
    { path: `/dashboard/${id}/members`, icon: <Users size={20} />, label: 'Мешканці' },
    { path: `/dashboard/${id}/repairs`, icon: <Wrench size={20} />, label: 'Ремонти' },
    { path: `/dashboard/${id}/laundry`, icon: <WashingMachine size={20} />, label: 'Пральня' },
    { path: `/dashboard/${id}/payments`, icon: <CreditCard size={20} />, label: 'Оплати' },
  ];

  return (
    <div className={`dashboard-container ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      {/* Overlay для закриття меню кліком по фону */}
      {isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside className={`dashboard-sidebar ${isMobileMenuOpen ? 'dashboard-sidebar--open' : ''}`}>
        <div className="dashboard-sidebar__logo">
          <div className="logo-icon"><Building2 size={24} /></div>
          <Link to="/" className="dashboard__home-link">
            Dormis<span>.</span>
          </Link>
          <button className="mobile-close" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="dashboard-sidebar__nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === `/dashboard/${id}`}
              className={({ isActive }) => `nav-item ${isActive ? 'nav-item--active' : ''}`}
            >
              <span className="nav-item__icon">{item.icon}</span>
              <span className="nav-item__label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="dashboard-sidebar__footer">
          <button className="btn-logout" onClick={handleGoBack}>
            <LogOut size={20} />
            <span>Повернутись</span>
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-header__left">
            <button className="mobile-burger" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="dashboard-header__title">
              <h1 className="dashboard-header__title title">
                {isLoading ? '...' : currentDorm?.name}
              </h1>
            </div>
          </div>

          <div className="dashboard-header__actions">
            <UserProfile user={user} />
          </div>
        </header>

        <section className="dashboard-content">
          <div className="dashboard-content__inner">
            <Outlet context={{ currentDorm }} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;