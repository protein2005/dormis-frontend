import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.scss';
import UserProfile from "@/components/UserProfile";

const Header = ({ variant }) => {
  const { isAuth, user } = useSelector(state => state.auth);
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
            <UserProfile user={user} />
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