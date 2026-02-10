import React, { forwardRef } from 'react';
import {
  ConstructorElement,
  ArrowUpIcon,
  ArrowDownIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import { BurgerConstructorElementUIProps } from './type';

export const BurgerConstructorElementUI = forwardRef<
  HTMLLIElement,
  BurgerConstructorElementUIProps
>(
  (
    {
      ingredient,
      index,
      totalItems,
      handleClose,
      isDragging,
      handleMoveUp,
      handleMoveDown
    },
    ref
  ) => (
    <li
      ref={ref}
      className={`${styles.element} ${isDragging ? styles.dragging : ''}`}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginRight: '8px'
        }}
      >
        {index > 0 && handleMoveUp && (
          <button
            onClick={handleMoveUp}
            type='button'
            style={{
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              lineHeight: '1'
            }}
          >
            <ArrowUpIcon type='primary' />
          </button>
        )}

        {index < totalItems - 1 && handleMoveDown && (
          <button
            onClick={handleMoveDown}
            type='button'
            style={{
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              lineHeight: '1'
            }}
          >
            <ArrowDownIcon type='primary' />
          </button>
        )}
      </div>

      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleClose}
      />
    </li>
  )
);
