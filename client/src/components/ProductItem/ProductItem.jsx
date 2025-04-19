import React, { useContext } from 'react';
import './ProductItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const ProductItem = ({ id, name, images, originalPrice, offerPrice, category, url }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="container">
      <div className='ProductItem'>
        <img className='product-item-image' src={url + "/images/" + images} alt="" /> {/* Fixed image source */}
        <span>{category}</span>
        <span><h3>{name}</h3></span>

        <div className='rating'>
          <span><img src={assets.star_icon} alt="star" /></span>
          <span><img src={assets.star_icon} alt="star" /></span>
          <span><img src={assets.star_icon} alt="star" /></span>
          <span><img src={assets.star_icon} alt="star" /></span>
          <span><img src={assets.star_dull_icon} alt="dull star" /></span>
        </div>

        <div className="cart-action">
          {!cartItems[id] ? (
            <div
              className="add-to-cart"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(id);
              }}
            >
              <img src={assets.cart_icon} alt="cart" />
              <span>Add</span>
            </div>
          ) : (
            <div className="item-counter">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromCart(id);
                }}
              >-</button>
              <span className='quantity'>{cartItems[id]}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(id);
                }}
              >+</button>
            </div>
          )}
        </div>

        <span className='offerPrice'>${originalPrice}</span>
        <span>${offerPrice}</span>
      </div>
    </div>
  );
};

export default ProductItem;
