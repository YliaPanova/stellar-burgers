import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TConstructorIngredient = TIngredient & {
  constructorId: string;
};

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = {
        ...action.payload,
        constructorId: `${action.payload._id}-${Date.now()}`
      };
    },

    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const newIngredient: TConstructorIngredient = {
        ...action.payload,
        constructorId: `${action.payload._id}-${Date.now()}`
      };
      state.ingredients.push(newIngredient);
    },

    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { addBun, addIngredient, removeIngredient, clearConstructor } =
  burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
