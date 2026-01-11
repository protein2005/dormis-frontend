import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Home, UserPlus } from 'lucide-react';
import './Onboarding.scss';
import JoinModal from "@/components/JoinModal/JoinModal";

const Onboarding = () => {
  const { user, memberships } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const [isJoinOpen, setIsJoinOpen] = useState(false);

  useEffect(() => {
    if (memberships && memberships.length > 0) {
      navigate('/dormitories');
    }
  }, [memberships, navigate]);

  return (
    <div className="onboarding">
      <div className="onboarding__container container">

        <header className="onboarding__header fade-in">
          <h1>Вітаємо, {user?.fullName || 'користувачу'}!</h1>
          <p>Щоб розпочати роботу з Dormis, оберіть одну з дій нижче</p>
        </header>

        <div className="onboarding__grid fade-in">
          <button
            className="onboarding-card"
            type="button"
          >
            <div className="onboarding-card__icon onboarding-card__icon--blue">
              <Home size={32} />
            </div>
            <div className="onboarding-card__content">
              <h3>Створити гуртожиток</h3>
              <p>Для адміністраторів. Налаштуйте новий цифровий простір, додайте правила та мешканців.</p>
            </div>
          </button>

          <button
            className="onboarding-card"
            onClick={() => setIsJoinOpen(true)}
            type="button"
          >
            <div className="onboarding-card__icon onboarding-card__icon--green">
              <UserPlus size={32} />
            </div>
            <div className="onboarding-card__content">
              <h3>Приєднатись до гуртожитку</h3>
              <p>Для студентів та персоналу. Введіть код запрошення, щоб отримати доступ до послуг.</p>
            </div>
          </button>
        </div>
      </div>
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />

    </div>
  );
};

export default Onboarding;