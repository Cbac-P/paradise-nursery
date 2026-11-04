import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const totalAmount = items.reduce((sum, i) => sum + i.cost * i.quantity, 0);

  const increase = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const decrease = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name)); // giảm về 0 thì xóa khỏi giỏ
    }
  };

  return (
    <div className="cart-container">
      <h2>Total Cart Amount: ${totalAmount}</h2>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item-info">
            <h3>{item.name}</h3>
            <div>Unit price: ${item.cost}</div>
            <div className="qty-controls">
              <button onClick={() => decrease(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increase(item)}>+</button>
            </div>
            <div>Total: ${item.cost * item.quantity}</div>
          </div>
          <button className="delete-btn" onClick={() => dispatch(removeItem(item.name))}>
            Delete
          </button>
        </div>
      ))}

      <div className="cart-actions">
        <button onClick={onContinueShopping}>Continue Shopping</button>
        <button className="checkout" onClick={() => alert('Coming Soon')}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
