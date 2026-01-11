import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { useActions } from "@/hooks/useActions";
import './Auth.scss';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ mode: 'onChange' });

  const { registerUser } = useActions();

  const onSubmit = async (data) => {
    console.log(data)
    registerUser(data);
  };

  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="auth-page">
      <div className="auth-card fade-in">
        <div className="auth-card__header">
          <h1>Реєстрація у Dormis</h1>
          <p>Створіть акаунт, щоб почати керувати вашим простором</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form__field">
            <label>Повне імʼя</label>
            <input
              className={errors.fullName ? 'error' : ''}
              placeholder="Олександр Петренко"
              {...register('fullName', {
                required: 'Імʼя обовʼязкове',
                minLength: { value: 3, message: 'Мінімум 3 символи' }
              })}
            />
            {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
          </div>

          <div className="auth-form__field">
            <label>Email</label>
            <input
              className={errors.email ? 'error' : ''}
              placeholder="student@univ.edu.ua"
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

          <button className="btn-google btn-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Створення...' : 'Зареєструватися'}
          </button>
        </form>

        <div className="auth-divider">
          <span>або</span>
        </div>

        <button className="btn-google btn-full" onClick={handleGoogleRegister}>
          <img src="/google-icon.svg" alt="" />
          Приєднатися через Google
        </button>

        <p className="auth-footer">
          Вже є акаунт? <Link to="/login">Увійти</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;