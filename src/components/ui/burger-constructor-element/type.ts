import { TIngredient } from '@utils-types';

export type BurgerConstructorElementUIProps = {
  ingredient: TIngredient;
  index: number;
  totalItems: number;
  handleClose: () => void;
  ref?: any;
  isDragging?: boolean;
  handleMoveUp?: () => void;
  handleMoveDown?: () => void;
};
