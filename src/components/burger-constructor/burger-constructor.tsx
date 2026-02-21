import { FC, useMemo } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { BurgerConstructorUI } from '../ui/burger-constructor';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
import {
  clearConstructor,
  removeIngredient,
  moveIngredient
} from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorState = useSelector((state) => state.burgerConstructor);
  const orderState = useSelector((state) => state.order);
  const user = useSelector((state) => state.auth.user);

  const bun = constructorState?.bun || null;
  const ingredients = constructorState?.ingredients || [];

  const orderRequest = orderState?.loading || false;
  const orderModalData = orderState?.order || null;

  const handleRemoveIngredient = (index: number) => {
    dispatch(removeIngredient(index));
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < ingredients.length - 1) {
      dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
    }
  };

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!bun || ingredients.length === 0) {
      return;
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ing) => ing._id),
      bun._id
    ];

    dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum, ingredient) => sum + (ingredient?.price || 0),
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{ bun, ingredients }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      handleRemoveIngredient={handleRemoveIngredient}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      canMakeOrder={!!bun && ingredients.length > 0}
    />
  );
};
