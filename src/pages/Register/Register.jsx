import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { useActions } from "@/hooks/useActions";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const { registerUser } = useActions()

  const onSubmit = async (data) => {
    console.log(data)
    registerUser(data);
  };

  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div>
      <h1>Реєстрація</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Повне імʼя"
          {...register('fullName', {
            required: 'Імʼя обовʼязкове',
            minLength: {
              value: 3,
              message: 'Мінімум 3 символи'
            }
          })}
        />
        {errors.fullName && <p>{errors.fullName.message}</p>}

        <input
          placeholder="Email"
          {...register('email', {
            required: 'Email обовʼязковий',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Некоректний email'
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Пароль"
          {...register('password', {
            required: 'Пароль обовʼязковий',
            minLength: {
              value: 6,
              message: 'Мінімум 6 символів'
            }
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          Зареєструватися
        </button>
      </form>

      <hr />

      <button onClick={handleGoogleRegister}>
        Зареєструватися через Google
      </button>

      <hr />

      <p>
        Вже є акаунту? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
};

export default Register;
