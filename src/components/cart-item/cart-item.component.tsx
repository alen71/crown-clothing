import React from 'react';
import { CartItemType } from '../../store/cart/cart.types';
import { CartItemContainer, ItemDetails } from './cart-item.styles';

const CartItem = ({ name, imageUrl, price, quantity }: CartItemType) => {
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
