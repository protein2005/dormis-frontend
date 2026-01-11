import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useActions } from "@/hooks/useActions";
import './Header.scss';
import { LogOut } from "lucide-react";

const Header = ({ variant }) => {
  const { isAuth, user } = useSelector(state => state.auth);
  const { logoutUser } = useActions();

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
              {isOnboarding ? (
                <>
                  <button
                    className="btn-logout"
                    onClick={logoutUser}
                    type="button"
                  >
                    <LogOut size={18} />
                    <span>Вийти</span>
                  </button>
                </>
              ) : (
                <Link to="/onboarding" className="button button--primary">
                  Кабінет ({user?.fullName?.split(' ')[0]})
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="button button--text">Увійти</Link>
              <Link to="/register" className="button button--primary">Почати</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;