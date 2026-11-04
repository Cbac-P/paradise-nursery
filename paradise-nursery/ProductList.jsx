import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

// Tạo ảnh thumbnail minh họa; bạn có thể thay bằng link ảnh thật
const img = (text, color) => `https://placehold.co/300x200/${color}/ffffff?text=${encodeURIComponent(text)}`;

const plantsArray = [
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', cost: 15, image: img('Lavender', '8e6bbf') },
      { name: 'Mint', cost: 8, image: img('Mint', '2e8b57') },
      { name: 'Basil', cost: 9, image: img('Basil', '3a9d5d') },
      { name: 'Rosemary', cost: 12, image: img('Rosemary', '4a7c59') },
      { name: 'Jasmine', cost: 18, image: img('Jasmine', 'c9a0dc') },
      { name: 'Lemon Balm', cost: 10, image: img('Lemon Balm', '6ab04c') },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      { name: 'Aloe Vera', cost: 14, image: img('Aloe Vera', '3d8b6e') },
      { name: 'Chamomile', cost: 11, image: img('Chamomile', 'd4a017') },
      { name: 'Echinacea', cost: 16, image: img('Echinacea', 'b5539c') },
      { name: 'Ginger', cost: 13, image: img('Ginger', 'a0522d') },
      { name: 'Turmeric', cost: 13, image: img('Turmeric', 'e0a030') },
      { name: 'Peppermint', cost: 9, image: img('Peppermint', '2f9e75') },
    ],
  },
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', cost: 20, image: img('Snake Plant', '3b6e4f') },
      { name: 'Spider Plant', cost: 12, image: img('Spider Plant', '5aa05a') },
      { name: 'Peace Lily', cost: 22, image: img('Peace Lily', '4f8f6f') },
      { name: 'Pothos', cost: 10, image: img('Pothos', '2e7d32') },
      { name: 'Rubber Plant', cost: 25, image: img('Rubber Plant', '1b5e20') },
      { name: 'ZZ Plant', cost: 24, image: img('ZZ Plant', '33691e') },
    ],
  },
];

function ProductList({ onHome }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const isInCart = (name) => cartItems.some((i) => i.name === name);

  return (
    <div>
      {/* Navbar: hiển thị ở cả trang Plants và trang Cart */}
      <div className="navbar">
        <div>
          <a onClick={onHome}>Home</a>
          <a onClick={() => setShowCart(false)}>Plants</a>
          <a onClick={() => setShowCart(true)}>Cart</a>
        </div>
        <div className="cart-icon" onClick={() => setShowCart(true)}>
          🛒<span className="cart-count">{totalCount}</span>
        </div>
      </div>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-container">
          {plantsArray.map((group) => (
            <div key={group.category}>
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <div className="price">${plant.cost}</div>
                    <button
                      className="add-btn"
                      disabled={isInCart(plant.name)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {isInCart(plant.name) ? 'Added' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
