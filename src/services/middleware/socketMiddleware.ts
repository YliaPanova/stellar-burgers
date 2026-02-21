import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../store';
import {
  wsConnectionStart,
  wsConnectionSuccess,
  wsConnectionError,
  wsConnectionClosed,
  wsGetMessage
} from '../slices/feedSlice';

export const socketMiddleware =
  (): Middleware => (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;

      if (wsConnectionStart.match(action)) {
        if (socket) {
          socket.close();
        }

        socket = new WebSocket('wss://norma.education-services.ru/orders/all');

        socket.onopen = () => {
          dispatch(wsConnectionSuccess());
        };

        socket.onerror = () => {
          dispatch(wsConnectionError('WebSocket error'));
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.success) {
              dispatch(wsGetMessage(data));
            }
          } catch (error) {}
        };

        socket.onclose = () => {
          dispatch(wsConnectionClosed());
        };
      }

      if (wsConnectionClosed.match(action) && socket) {
        socket.close();
        socket = null;
      }

      return next(action);
    };
  };
