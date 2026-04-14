import React from 'react';

export default function Navbar({itemsInCart, calculateTotal, openViewCart}) {
  return (
    <div className="navbar">
      <h1>Clothing Store</h1>
      <div className="cart_info">
        <p>Items in Cart: {itemsInCart}</p>
        <p>Total: ${calculateTotal().toFixed(2)}</p>
        <button onClick={() => openViewCart()}>Checkout</button>
      </div>
    </div>
  );
}