import { TIngredient } from '@utils-types';
import { Ref } from 'react';

export type BurgerConstructorElementUIProps = {
  ingredient: TIngredient;
  index: number;
  totalItems: number;
  handleClose: () => void;
  ref?: Ref<HTMLLIElement>;
  isDragging?: boolean;
  handleMoveUp?: () => void;
  handleMoveDown?: () => void;
};
