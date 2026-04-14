
export default function ViewWishlist({closeWishlist, itemsInWishlist, wishlist}) {

  return (
    <div className="view_wishlist">
      <div className="wishlist_content">
        <h2 className="items_in_wishlist">Items in Wishlist</h2>
        <p>Items in Wishlist: {itemsInWishlist}</p>
        <div className="wishlist_items">
            {wishlist.length === 0 ? (
            <p>Your wishlist is empty</p>
          ) : (
            wishlist.map((item, index) => (
              <div key={item.id} className="wishlist_item">
                <p>{item.name}: ${item.price}</p>
              </div>
            ))
          )}
          </div>
          
        <button onClick={closeWishlist}>Close</button>
      </div>
    </div>
  );
}