import { useSelector, useDispatch } from '../../services/store';
import styles from './constructor-page.module.css';
import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();

  // Берем данные из стора для отладки
  const { items, loading } = useSelector((state) => state.ingredients);

  // Загружаем ингредиенты при загрузке страницы
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  if (items.length === 0) {
    return (
      <div className={styles.containerMain}>
        <h1
          className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
        >
          Соберите бургер
        </h1>
        <div className='text text_type_main-medium pl-5'>
          Ингредиенты загружаются...
        </div>
      </div>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        {/* Теперь BurgerIngredients сам берет данные из Redux */}
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
