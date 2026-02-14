import { Link } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, CheckCircle2, ChevronDown } from 'lucide-react';
import './Home.scss';

const Home = () => {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero__container">
          <h1 className="hero__title fade-in">
            Керуйте гуртожитком <span>розумно</span>
          </h1>
          <p className="hero__subtitle fade-in">
            Автоматизуйте поселення, цифровізуйте документи та тримайте все під контролем в одній системі.
          </p>
          <div className="hero__btns fade-in">
            <Link to="/register" className="button button--large button--primary">
              Створити простір
            </Link>
            <Link to="/about" className="button button--large button--outline">
              Дізнатися більше
            </Link>
          </div>
        </div>
        <div className="hero__scroll">
          <ChevronDown size={32} />
        </div>
      </section>

      <section className="features">
        <div className="features__container">
          <h2 className="features__title fade-in">Оберіть свій функціонал</h2>

          <div className="features__grid fade-in">
            <div className="feature-card feature-card--student">
              <div className="feature-card__icon">
                <GraduationCap size={40} strokeWidth={1.5} />
              </div>
              <h3 className="feature-card__name">Для студентів</h3>
              <ul className="feature-card__list">
                <li><CheckCircle2 size={18} /> Швидка подача заявок</li>
                <li><CheckCircle2 size={18} /> Статус документів онлайн</li>
                <li><CheckCircle2 size={18} /> Зв'язок з адміністрацією</li>
                <li><CheckCircle2 size={18} /> Оплата послуг у додатку</li>
              </ul>
            </div>

            <div className="feature-card feature-card--admin">
              <div className="feature-card__icon">
                <LayoutDashboard size={40} strokeWidth={1.5} />
              </div>
              <h3 className="feature-card__name">Для адміністрації</h3>
              <ul className="feature-card__list">
                <li><CheckCircle2 size={18} /> Цифровий облік місць</li>
                <li><CheckCircle2 size={18} /> Генерація звітів та наказів</li>
                <li><CheckCircle2 size={18} /> Контроль платежів</li>
                <li><CheckCircle2 size={18} /> Автоматизація черги</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;