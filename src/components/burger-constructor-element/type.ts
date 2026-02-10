import { TIngredient } from '@utils-types';

export type TBurgerConstructorElementProps = {
  ingredient: TIngredient;
  index: number;
  totalItems: number;
  handleClose?: () => void;
  handleMoveUp?: () => void;
  handleMoveDown?: () => void;
};
