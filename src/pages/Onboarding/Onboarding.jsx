import './Onboarding.scss'
import { useActions } from "@/hooks/useActions";
import { useSelector } from "react-redux";

const Onboarding = () => {
  const { logoutUser } = useActions()
  const { user } = useSelector(state => state.auth);

  return (
    <div
      className="onboarding"
    >
      <div>
        <h1>
          Ласкаво просимо, {user?.fullName}!
        </h1>
        <p>
          Оберіть, будь ласка, варіант дій для початку роботи з вашим гуртожитком.
        </p>
      </div>
      <button type="button">
        Створити гуртожиток
      </button>
      <button type="button">
        Приєднатись до гуртожитку
      </button>

      <div>
        <button onClick={logoutUser} type="button">
          Вийти з акаунту
        </button>
      </div>
    </div>
  )
}

export default Onboarding