import React from 'react';

export default function Products({product, addToCart, openModal, addToWishlist}) {
  return (
    <div className="product_display">

    <img src={product.image} alt={product.name} className="product_image" />

      <h2 className="product_name">{product.name}</h2>
      <p>${product.price}</p>
      <p>Stock: {product.stock}</p>
      <button onClick={() => openModal(product)}>View Details</button>
      <button
        onClick={() => addToCart(product)}
        disabled={product.stock === 0}
        className="add_to_cart_button"
      >
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </button>
      <button onClick={() => addToWishlist(product)} className="add_to_wishlist_button">
        Add to Wishlist 
      </button>
    </div>
  );
}