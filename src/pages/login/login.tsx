import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && isAuthChecked) {
      const from = location.state?.from || '/';
      navigate(from);
    }
  }, [user, isAuthChecked, navigate, location]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message || 'Ошибка авторизации. Проверьте email и пароль.'
        );
      } else {
        setError('Произошла неизвестная ошибка');
      }
    }
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
