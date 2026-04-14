import React from 'react';

export default function Modal({ product, closeModal,  }) {
  return (
    <div className="modal">
      <div className="modal_content">
        <img src={product.image} alt={product.name} className="modal_product_image" />
        <h2 className="modal_product_name">{product.name}</h2>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <p>Stock: {product.stock}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}