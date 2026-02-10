import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { FC, useEffect } from 'react';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ingredients = useSelector((state) => state.ingredients.items);
  const loading = useSelector((state) => state.ingredients.loading);
  const error = useSelector((state) => state.ingredients.error);

  const ingredient = ingredients.find((item) => item._id === id);

  useEffect(() => {
    if (!loading && ingredients.length > 0 && !ingredient && id) {
    }
  }, [loading, ingredients, ingredient, id]);

  if (loading && ingredients.length === 0) {
    return <Preloader />;
  }

  if (!ingredient && !loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Ингредиент не найден</h2>
        <p>Ингредиент с ID: {id} не существует</p>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#4C4CFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Ошибка загрузки</h2>
        <p>{error}</p>
      </div>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredient!} />;
};
