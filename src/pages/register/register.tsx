import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { registerUserApi } from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (!userName.trim() || !email.trim() || !password.trim()) {
      setError('Заполните все поля');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
      // Вызываем API регистрации
      const response = await registerUserApi({
        email,
        password,
        name: userName
      });

      if (response.success) {
        localStorage.setItem('refreshToken', response.refreshToken);
        setCookie('accessToken', response.accessToken);

        navigate('/login', {
          state: {
            message: 'Регистрация успешна! Теперь войдите в систему.'
          }
        });
      } else {
        setError('Ошибка регистрации');
      }
    } catch (err: any) {
      let errorMessage = 'Ошибка при регистрации';

      if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);
    }
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
