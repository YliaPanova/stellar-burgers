import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { IngredientDetails, OrderInfo } from '@components';
import { ModalUI } from '../ui/modal';
import { AppHeader } from '@components';
import ProtectedRoute from '../protected-route';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../../index.css';
import styles from './app.module.css';
import { FC, useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/authSlice';

const ModalSwitch: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />

        {/* Защищенные маршруты только для НЕавторизованных */}
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        {/* Защищенные маршруты только для авторизованных */}
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {/* Модальные окна */}
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <ModalUI title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails />
              </ModalUI>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <ModalUI title='' onClose={handleModalClose}>
                <OrderInfo />
              </ModalUI>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <ModalUI title='' onClose={handleModalClose}>
                  <OrderInfo />
                </ModalUI>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <BrowserRouter>
        <DndProvider backend={HTML5Backend}>
          <ModalSwitch />
        </DndProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
