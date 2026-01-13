import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plus, UserPlus } from 'lucide-react';
import UserProfile from "@/components/UserProfile";
import './Header.scss';
import JoinModal from "@/components/JoinModal";

const Header = ({ variant }) => {
  const { isAuth, user } = useSelector(state => state.auth);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const isOnboarding = variant === 'onboarding';

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          Dormis<span>.</span>
        </Link>

        {!isOnboarding && (
          <nav className="header__nav">
            <Link to="/about">Про нас</Link>
            <Link to="/features">Можливості</Link>
          </nav>
        )}

        <div className="header__actions">
          {isAuth ? (
            <>
              {!isOnboarding && (
                <div className="header__quick-actions">
                  <button
                    className="action-btn action-btn--join"
                    onClick={() => setIsJoinModalOpen(true)}
                    title="Приєднатися за кодом"
                  >
                    <UserPlus size={20} />
                    <span>Приєднатись</span>
                  </button>

                  <Link
                    to="/dormitories/create"
                    className="action-btn action-btn--create"
                    title="Створити гуртожиток"
                  >
                    <Plus size={20} />
                    <span>Створити</span>
                  </Link>
                </div>
              )}

              <UserProfile user={user} />
            </>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="button button--text">Увійти</Link>
              <Link to="/register" className="button button--primary">Почати</Link>
            </div>
          )}
        </div>
      </div>

      <JoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </header>
  );
};

export default Header;