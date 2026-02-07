import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { OrderInfoUI } from '../ui/order-info';
import { FC, useEffect, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { fetchUserOrders } from '../../services/slices/userOrdersSlice';
import { useDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const orderNumber = useMemo(() => {
    if (!number) return 0;
    const num = parseInt(number);
    return isNaN(num) ? 0 : num;
  }, [number]);

  const feedOrders = useSelector((state) => state.feed.orders);
  const userOrders = useSelector((state) => state.userOrders.orders);
  const ingredients = useSelector((state) => state.ingredients.items);

  useEffect(() => {
    if (feedOrders.length === 0) {
      dispatch(fetchFeeds());
    }

    if (userOrders.length === 0) {
      const hasToken =
        localStorage.getItem('refreshToken') ||
        document.cookie.includes('accessToken');
      if (hasToken) {
        dispatch(fetchUserOrders());
      }
    }

    if (ingredients.length === 0) {
    }
  }, [
    dispatch,
    orderNumber,
    feedOrders.length,
    userOrders.length,
    ingredients.length
  ]);

  const allOrders = useMemo(
    () => [...feedOrders, ...userOrders],
    [feedOrders, userOrders]
  );

  const order = useMemo(
    () => allOrders.find((order) => order.number === orderNumber),
    [allOrders, orderNumber]
  );

  const orderInfo = useMemo(() => {
    if (!order || ingredients.length === 0) return null;

    const orderIngredients = order.ingredients
      .map((id) => ingredients.find((ing) => ing._id === id))
      .filter(Boolean) as TIngredient[];

    const totalPrice = orderIngredients.reduce(
      (sum, ing) => sum + ing.price,
      0
    );

    const ingredientsInfo: { [key: string]: TIngredient & { count: number } } =
      {};

    orderIngredients.forEach((ingredient) => {
      if (ingredientsInfo[ingredient._id]) {
        ingredientsInfo[ingredient._id].count += 1;
      } else {
        ingredientsInfo[ingredient._id] = {
          ...ingredient,
          count: 1
        };
      }
    });

    return {
      _id: order._id,
      status: order.status,
      name: order.name,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      number: order.number,
      ingredients: order.ingredients,
      ingredientsInfo,
      date: new Date(order.createdAt),
      total: totalPrice
    };
  }, [order, ingredients]);

  useEffect(() => {}, [
    orderNumber,
    order,
    allOrders.length,
    ingredients.length,
    orderInfo
  ]);

  if (ingredients.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Preloader />
        <p>Загрузка ингредиентов...</p>
        <p>Перейдите на главную страницу для загрузки данных</p>
      </div>
    );
  }

  if (!orderInfo) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <Preloader />
        <p>Загрузка заказа #{orderNumber}...</p>
        <p>Ищем заказ среди {allOrders.length} заказов...</p>
        <p>Если загрузка долгая, перейдите на главную, затем вернитесь сюда</p>
      </div>
    );
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
