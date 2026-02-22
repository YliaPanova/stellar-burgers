import burgerConstructorSlice, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../burgerConstructorSlice';
import { TIngredient } from '@utils-types';

describe('burgerConstructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const mockBun: TIngredient = {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    price: 1255,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const mockIngredient: TIngredient = {
    _id: '2',
    name: 'Мясо бессмертных моллюсков',
    type: 'main',
    price: 1337,
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  const mockIngredient2: TIngredient = {
    _id: '3',
    name: 'Соус Spicy-X',
    type: 'sauce',
    price: 90,
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 300,
    image: '',
    image_large: '',
    image_mobile: ''
  };

  test('должен добавлять булку (заменять существующую)', () => {
    const action = addBun(mockBun);
    const state = burgerConstructorSlice(initialState, action);

    expect(state.bun).not.toBeNull();
    expect(state.bun?._id).toBe(mockBun._id);
    expect(state.bun?.name).toBe(mockBun.name);
    expect(state.bun?.price).toBe(mockBun.price);
    expect(state.bun).toHaveProperty('constructorId');
    expect(state.ingredients).toEqual([]);
  });

  test('должен добавлять начинку', () => {
    const action = addIngredient(mockIngredient);
    const state = burgerConstructorSlice(initialState, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);

    const addedIngredient = state.ingredients[0];
    expect(addedIngredient._id).toBe(mockIngredient._id);
    expect(addedIngredient.name).toBe(mockIngredient.name);
    expect(addedIngredient.price).toBe(mockIngredient.price);
    expect(addedIngredient).toHaveProperty('constructorId');
  });

  test('должен добавлять несколько начинок', () => {
    let state = burgerConstructorSlice(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(state.ingredients).toHaveLength(1);

    state = burgerConstructorSlice(state, addIngredient(mockIngredient2));
    expect(state.ingredients).toHaveLength(2);

    expect(state.ingredients[0]._id).toBe(mockIngredient._id);
    expect(state.ingredients[0]).toHaveProperty('constructorId');
    expect(state.ingredients[1]._id).toBe(mockIngredient2._id);
    expect(state.ingredients[1]).toHaveProperty('constructorId');
  });

  test('должен удалять начинку по индексу', () => {
    let state = burgerConstructorSlice(
      initialState,
      addIngredient(mockIngredient)
    );
    state = burgerConstructorSlice(state, addIngredient(mockIngredient2));
    expect(state.ingredients).toHaveLength(2);

    const secondIngredientId = state.ingredients[1]._id;

    const action = removeIngredient(0);
    state = burgerConstructorSlice(state, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe(secondIngredientId);
  });

  test('должен перемещать начинку вверх', () => {
    let state = burgerConstructorSlice(
      initialState,
      addIngredient(mockIngredient)
    );
    state = burgerConstructorSlice(state, addIngredient(mockIngredient2));

    const firstId = state.ingredients[0]._id;
    const secondId = state.ingredients[1]._id;

    const action = moveIngredient({ fromIndex: 1, toIndex: 0 });
    state = burgerConstructorSlice(state, action);

    expect(state.ingredients[0]._id).toBe(secondId);
    expect(state.ingredients[1]._id).toBe(firstId);
  });

  test('должен перемещать начинку вниз', () => {
    let state = burgerConstructorSlice(
      initialState,
      addIngredient(mockIngredient)
    );
    state = burgerConstructorSlice(state, addIngredient(mockIngredient2));

    const firstId = state.ingredients[0]._id;
    const secondId = state.ingredients[1]._id;

    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    state = burgerConstructorSlice(state, action);

    expect(state.ingredients[0]._id).toBe(secondId);
    expect(state.ingredients[1]._id).toBe(firstId);
  });

  test('должен очищать конструктор', () => {
    let state = burgerConstructorSlice(initialState, addBun(mockBun));
    state = burgerConstructorSlice(state, addIngredient(mockIngredient));
    state = burgerConstructorSlice(state, addIngredient(mockIngredient2));

    expect(state.bun).not.toBeNull();
    expect(state.ingredients).toHaveLength(2);

    const action = clearConstructor();
    state = burgerConstructorSlice(state, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});
