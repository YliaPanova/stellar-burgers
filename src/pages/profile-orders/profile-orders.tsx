import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/userOrdersSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice'; // ← ДОБАВЬ
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.userOrders.orders);
  const loading = useSelector((state) => state.userOrders.loading);
  const ingredients = useSelector((state) => state.ingredients.items);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      // Загружаем заказы пользователя
      dispatch(fetchUserOrders());

      // Загружаем ингредиенты если их нет
      if (ingredients.length === 0) {
        dispatch(fetchIngredients());
      }
    }
  }, [dispatch, user, ingredients.length]);

  if (!user) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>История заказов</h1>
        <p>Войдите в систему</p>
      </div>
    );
  }

  if ((loading && orders.length === 0) || ingredients.length === 0) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
