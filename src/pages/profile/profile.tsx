import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { setUser } from '../../services/slices/authSlice';
import { updateUserApi } from '../../utils/burger-api';
import { TUser } from '@utils-types';

type TUpdateUserData = {
  name?: string;
  email?: string;
  password?: string;
};

export const Profile: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [updateUserError, setUpdateUserError] = useState('');

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== (user?.name || '') ||
    formValue.email !== (user?.email || '') ||
    !!formValue.password;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setUpdateUserError('');

    if (!user) return;

    try {
      const updateData: TUpdateUserData = {};
      if (formValue.name !== user.name) updateData.name = formValue.name;
      if (formValue.email !== user.email) updateData.email = formValue.email;
      if (formValue.password) updateData.password = formValue.password;

      if (Object.keys(updateData).length > 0) {
        const response = await updateUserApi(updateData);

        if (response.success) {
          dispatch(setUser(response.user as TUser));
          setFormValue((prev) => ({ ...prev, password: '' }));
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setUpdateUserError(err.message || 'Ошибка обновления данных');
      } else {
        setUpdateUserError('Произошла неизвестная ошибка');
      }
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();

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
