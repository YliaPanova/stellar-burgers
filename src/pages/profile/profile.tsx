import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { setUser } from '../../services/slices/authSlice';
import { updateUserApi } from '../../utils/burger-api';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  // Берем пользователя из стора
  const user = useSelector((state) => state.auth.user);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [updateUserError, setUpdateUserError] = useState('');

  // Заполняем форму при загрузке или изменении пользователя
  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  // Проверяем изменилась ли форма
  const isFormChanged =
    formValue.name !== (user?.name || '') ||
    formValue.email !== (user?.email || '') ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateUserError('');

    if (!user) return;

    try {
      // Готовим данные для обновления
      const updateData: any = {};
      if (formValue.name !== user.name) updateData.name = formValue.name;
      if (formValue.email !== user.email) updateData.email = formValue.email;
      if (formValue.password) updateData.password = formValue.password;

      // Если есть что обновлять
      if (Object.keys(updateData).length > 0) {
        const response = await updateUserApi(updateData);

        if (response.success) {
          // Обновляем пользователя в сторе
          dispatch(setUser(response.user));
          // Очищаем поле пароля
          setFormValue((prev) => ({ ...prev, password: '' }));
          alert('Данные обновлены успешно!');
        }
      }
    } catch (err: any) {
      console.error('Ошибка обновления профиля:', err);
      setUpdateUserError(err.message || 'Ошибка обновления данных');
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    // Возвращаем исходные значения
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
    setUpdateUserError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    setUpdateUserError('');
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
