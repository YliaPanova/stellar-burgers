import ingredientsSlice, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      price: 100,
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 200,
      image: '',
      image_large: '',
      image_mobile: ''
    }
  ];

  test('должен устанавливать loading в true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsSlice(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('должен заполнять items и устанавливать loading в false при fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBe(null);
  });

  test('должен устанавливать ошибку и loading в false при fetchIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const state = ingredientsSlice(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.items).toEqual([]);
  });
});
