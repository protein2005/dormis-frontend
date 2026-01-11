import './Onboarding.scss'
import { useSelector } from "react-redux";
import { Home, UserPlus } from 'lucide-react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const { user } = useSelector(state => state.auth);
  const { memberships } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (memberships && memberships.length > 0) {
      navigate('/dormitories');
    }
  }, [memberships, navigate]);

  return (
    <div className="onboarding">
      <div className="onboarding__container container">
        <header className="onboarding__header fade-in">
          <h1>Ласкаво просимо, {user?.fullName}!</h1>
          <p>Оберіть, як ви хочете почати роботу з Dormis</p>
        </header>

        <div className="onboarding__grid fade-in">
          <button className="onboarding-card" type="button">
            <div className="onboarding-card__icon onboarding-card__icon--blue">
              <Home size={32} />
            </div>
            <div className="onboarding-card__content">
              <h3>Створити гуртожиток</h3>
              <p>Для адміністраторів та власників. Створіть новий цифровий простір та керуйте поселенням.</p>
            </div>
          </button>

          <button className="onboarding-card" type="button">
            <div className="onboarding-card__icon onboarding-card__icon--green">
              <UserPlus size={32} />
            </div>
            <div className="onboarding-card__content">
              <h3>Приєднатись до гуртожитку</h3>
              <p>Для студентів та персоналу. Використовуйте код запрошення, щоб увійти до існуючого закладу.</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Onboarding