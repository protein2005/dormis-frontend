import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('accessToken');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/onboarding');
    } else {
      navigate('/login');
    }
  }, []);

  return <div>Авторизація... зачекайте</div>;
};

export default OAuthSuccess;