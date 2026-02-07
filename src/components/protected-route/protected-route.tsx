import { Navigate, useLocation } from 'react-router-dom';
import { FC, ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, onlyUnAuth }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);

  // Если проверка авторизации еще не завершена
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // Если маршрут только для неавторизованных (login, register и т.д.)
  if (onlyUnAuth && user) {
    // Авторизованный пытается зайти на страницу входа
    const from = location.state?.from || '/';
    return <Navigate to={from} />;
  }

  // Если маршрут только для авторизованных (профиль, заказы и т.д.)
  if (!onlyUnAuth && !user) {
    // Неавторизованный пытается зайти на защищенную страницу
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // Все проверки пройдены
  return children;
};

export default ProtectedRoute;
