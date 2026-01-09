import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { useActions } from "@/hooks/useActions";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const { loginUser } = useActions()

  const onSubmit = async (data) => {
    console.log(data)
    loginUser(data);
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div>
      <h1>Вхід</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
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
          Увійти
        </button>
      </form>

      <hr />

      <button onClick={handleGoogleLogin}>
        Увійти через Google
      </button>

      <hr />

      <p>
        Ще немає акаунту? <Link to="/register">Зареєструватися</Link>
      </p>
    </div>
  );
};

export default Login;
