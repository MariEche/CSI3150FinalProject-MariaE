import React, { use, useState } from 'react';
import { useEffect } from 'react';
import Navbar from './navbar';
import Filtering from './filtering';
import Products from './product_cards';
import Modal from './components/modal';
import { list_products } from './data';
import ViewCart from './components/viewcart';
import ViewWishlist from './components/wishlist';

export default function App() {
  const [products, setProducts] = useState(list_products);
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewCartOpen, setViewCartOpen] = useState(false);
  const [viewWishlistOpen, setViewWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    if (product.stock <= 0) return;
    setCart(prev => [...prev, product]);
    setTotalItems(prev => prev + 1);
    setTotalPrice(prev => prev + product.price);
    setProducts(prevProducts => prevProducts.map(p =>
      p.id === product.id ? { ...p, stock: p.stock - 1 } : p));
  };

  const addToWishlist = (product) => {
  setWishlist(prev => {
    if (prev.find(item => item.id === product.id)) return prev;
    return [...prev, product];
  });
};

  const filteredProducts = products
    .filter(p => categoryFilter === "All" || p.category === categoryFilter)
    .sort((a, b) => {
      if (priceFilter === "low") return a.price - b.price;
      if (priceFilter === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div>
      <Navbar itemsInCart={totalItems} calculateTotal={() => totalPrice} openViewCart={() => setViewCartOpen(true)} />
         {viewCartOpen && (
        <ViewCart closeCart={() => setViewCartOpen(false)} itemsInCart={totalItems} calculateTotal={() => totalPrice} cart={cart} />
      )}
      <Filtering byCategories={setCategoryFilter} byPrice={setPriceFilter} openWishlist={() => setViewWishlistOpen(true)} />
      <div className="product_list">
        {filteredProducts.map(product => (
          <Products key={product.id} product={product} addToCart={addToCart} openModal={setSelectedProduct} addToWishlist={addToWishlist} />
        ))}
      </div>
      {selectedProduct && (
        <Modal product={selectedProduct} closeModal={() => setSelectedProduct(null)} />
      )}
      {viewWishlistOpen && (
        <ViewWishlist closeWishlist={() => setViewWishlistOpen(false)} itemsInWishlist={wishlist.length} wishlist={wishlist} />
      )}
    </div>
  );
}