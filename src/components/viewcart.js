import React, { useState } from 'react';

export default function ViewCart({closeCart, itemsInCart, cart, calculateTotal }) {
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState("");

    const applyPromoCode = () => {
        if (promoCode === "SAVE50") {
            setDiscount(0.5);
            setError("");
        } else {
            setError("Invalid promo code.");
        }
    };

    const total = calculateTotal();
    const discountedTotal = total - (total * discount);
    const discountMade = total * discount;
  return (
    <div className="view_cart">
      <div className="cart_content">
        <h2 className="items_in_cart">Items in Cart</h2>
        <p>Items in Cart: {itemsInCart}</p>
        <div className="cart_items">
            {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div key={item.id} className="cart_item">
                <p>{item.name}: ${item.price}</p>
              </div>
            ))
          )}
          </div>
          <div className="promo_code">
            <input
              type="text"
              placeholder="Enter SAVE50 for 50% off"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={applyPromoCode}>Apply</button>
            <p>{error}</p>
        </div>
        <p>Discount: -${discountMade.toFixed(2)}</p>
        <p>Total: ${discountedTotal.toFixed(2)}</p>
        <button onClick={closeCart}>Close</button>
      </div>
    </div>
  );
}