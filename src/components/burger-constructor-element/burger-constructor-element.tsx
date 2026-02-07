import { FC } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { TBurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import { removeIngredient } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructorElement: FC<TBurgerConstructorElementProps> = ({
  ingredient,
  index,
  totalItems,
  handleClose
}) => {
  const dispatch = useDispatch();

  const onClose =
    handleClose ||
    (() => {
      dispatch(removeIngredient(index));
    });

  return (
    <BurgerConstructorElementUI
      ingredient={ingredient}
      index={index}
      totalItems={totalItems}
      handleClose={onClose}
    />
  );
};
