import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Settings,
  LogOut,
  LayoutDashboard,
  CreditCard
} from 'lucide-react';
import { useActions } from "@/hooks/useActions";
import './UserProfile.scss';

const UserProfile = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef(null);
  const { logoutUser } = useActions();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  return (
    <div className="user-dropdown" ref={dropdownRef}>
      <div
        className={`user-profile ${isOpen ? 'user-profile--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="user-profile__avatar">
          {user?.avatar && !imgError ? (
            <img
              src={user.avatar}
              alt={user.fullName}
              className="user-profile__img"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
            />
          ) : (
            getInitials(user?.fullName)
          )}
        </div>
        <div className="user-profile__info">
          <span className="user-profile__name">{user?.fullName}</span>
          <span className="user-profile__email">{user?.email}</span>
        </div>
        <Motion.div
          className="user-profile__chevron"
          animate={{ rotate: isOpen ? 180 : 0 }}
        >
          <ChevronDown size={16} />
        </Motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            className="dropdown-menu"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="dropdown-menu__header">
              <p className="role-label">Мій акаунт</p>
            </div>

            <div className="dropdown-menu__list">
              <Link to="/onboarding" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <LayoutDashboard size={18} />
                <span>Дашборд</span>
              </Link>
              <Link to="/profile/settings" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <Settings size={18} />
                <span>Налаштування</span>
              </Link>
              <Link to="/billing" className="dropdown-item" onClick={() => setIsOpen(false)}>
                <CreditCard size={18} />
                <span>Тарифний план</span>
              </Link>
            </div>

            <div className="dropdown-menu__divider" />

            <button className="dropdown-item dropdown-item--logout" onClick={logoutUser}>
              <LogOut size={18} />
              <span>Вийти з системи</span>
            </button>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserProfile;