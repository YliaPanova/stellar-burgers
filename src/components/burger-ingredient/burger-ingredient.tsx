import { FC, memo } from 'react';

import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {
  addBun,
  addIngredient
} from '../../services/slices/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    // Получаем данные конструктора
    const constructorState = useSelector((state) => state.burgerConstructor);

    // Подсчет количества
    const count = useSelector((state) => {
      let count = 0;

      if (state.burgerConstructor?.bun?._id === ingredient._id) {
        count += 2;
      }

      const ingredients = state.burgerConstructor?.ingredients || [];
      ingredients.forEach((item) => {
        if (item?._id === ingredient._id) {
          count += 1;
        }
      });

      return count;
    });

    const handleAdd = () => {
      if (ingredient.type === 'bun') {
        dispatch(addBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
