import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__info">
            <Link to="/" className="footer__logo">
              Dormis<span>.</span>
            </Link>
            <p className="footer__description">
              Інноваційна система управління гуртожитками, що робить життя студентів та роботу адміністрації простішою.
            </p>
          </div>

          <div className="footer__nav">
            <div className="footer__nav-group">
              <h4 className="footer__nav-title">Продукт</h4>
              <Link to="/features">Можливості</Link>
              <Link to="/about">Про нас</Link>
            </div>

            <div className="footer__nav-group">
              <h4 className="footer__nav-title">Підтримка</h4>
              <Link to="/help">Допомога</Link>
              <Link to="/contact">Контакти</Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Dormis. Всі права захищені.
          </p>
          <div className="footer__legal">
            <Link to="/privacy">Конфіденційність</Link>
            <Link to="/terms">Умови використання</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;