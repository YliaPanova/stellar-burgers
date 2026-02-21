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

    if (!userName.trim() || !email.trim() || !password.trim()) {
      setError('Заполните все поля');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    try {
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
    } catch (err: unknown) {
      let errorMessage = 'Ошибка при регистрации';

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof err.response === 'object' &&
        err.response !== null &&
        'data' in err.response &&
        typeof err.response.data === 'object' &&
        err.response.data !== null &&
        'message' in err.response.data
      ) {
        errorMessage = (err.response.data as { message: string }).message;
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
