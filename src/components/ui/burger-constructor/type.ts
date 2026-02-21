import { TIngredient, TOrder } from '@utils-types';

export type BurgerConstructorUIProps = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TIngredient[];
  };
  orderRequest: boolean;
  price: number;
  orderModalData: TOrder | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
  handleRemoveIngredient: (index: number) => void;
  handleMoveUp?: (index: number) => void;
  handleMoveDown?: (index: number) => void;
  canMakeOrder?: boolean;
};
