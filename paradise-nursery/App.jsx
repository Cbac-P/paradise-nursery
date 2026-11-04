import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  if (showProductList) {
    return <ProductList onHome={() => setShowProductList(false)} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Welcome to your home for beautiful houseplants</p>
        <button className="get-started-btn" onClick={() => setShowProductList(true)}>
          Get Started
        </button>
        <AboutUs />
      </div>
    </div>
  );
}

export default App;
