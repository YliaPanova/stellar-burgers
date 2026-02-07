import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { setUser } from '../../services/slices/authSlice';
import { setCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Удаляем токены
    setCookie('accessToken', '', { expires: -1 });
    localStorage.removeItem('refreshToken');

    // Очищаем пользователя в сторе
    dispatch(setUser(null));

    // Перенаправляем на логин
    navigate('/login');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
