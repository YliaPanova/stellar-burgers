import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchFeeds } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  // Берем данные из стора
  const orders = useSelector((state) => state.feed.orders);
  const loading = useSelector((state) => state.feed.loading);
  const total = useSelector((state) => state.feed.total);
  const totalToday = useSelector((state) => state.feed.totalToday);
  const ingredients = useSelector((state) => state.ingredients.items);
  const ingredientsLoading = useSelector((state) => state.ingredients.loading);

  // Загружаем данные
  useEffect(() => {
    dispatch(fetchFeeds());

    // Загружаем ингредиенты если их нет
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  // Показываем прелоадер если загрузка
  if ((loading && orders.length === 0) || ingredientsLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
