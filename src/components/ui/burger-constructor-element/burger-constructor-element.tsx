import React, { FC } from 'react';
import {
  ConstructorElement,
  DragIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor-element.module.css';
import { BurgerConstructorElementUIProps } from './type';

export const BurgerConstructorElementUI: FC<
  BurgerConstructorElementUIProps
> = ({ ingredient, index, totalItems, handleClose, ref, isDragging }) => (
  <li className={`${styles.element} ${isDragging ? styles.dragging : ''}`}>
    <DragIcon type='primary' />
    <ConstructorElement
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      handleClose={handleClose}
    />
  </li>
);
