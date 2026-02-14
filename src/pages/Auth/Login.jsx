import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { useActions } from "@/hooks/useActions";
import './Auth.scss';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ mode: 'onChange' });

  const { loginUser } = useActions();

  const onSubmit = async (data) => {
    console.log(data)
    loginUser(data);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-card__header">
          <h1>Вхід у Dormis</h1>
          <p>Введіть свої дані, щоб продовжити роботу</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__field">
            <label>Email</label>
            <input
              className={errors.email ? 'error' : ''}
              placeholder="example@mail.com"
              {...register('email', {
                required: 'Email обовʼязковий',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Некоректний email'
                }
              })}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div className="auth-form__field">
            <label>Пароль</label>
            <input
              type="password"
              className={errors.password ? 'error' : ''}
              placeholder="••••••••"
              {...register('password', {
                required: 'Пароль обовʼязковий',
                minLength: { value: 6, message: 'Мінімум 6 символів' }
              })}
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          <button className="btn-google" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Вхід...' : 'Увійти'}
          </button>
        </form>

        <div className="auth-divider">
          <span>або</span>
        </div>

        <button className="btn-google btn-full" onClick={handleGoogleLogin}>
          <img src="/google-icon.svg" alt="" />
          Увійти через Google
        </button>

        <p className="auth-footer">
          Ще немає акаунту? <Link to="/register">Зареєструватися</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;