import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import ProductItem from '../ProductItem/ProductItem';
import { assets } from '../../assets/assets';
import './BestSeller.css'; // You can customize styles here
import { features } from '../../assets/assets';
const BestSeller = () => {
  const { productList, url } = useContext(StoreContext);

  // Filter only vegetables
  const vegetableProducts = productList.filter(
    (item) => item.category.toLowerCase() === 'vegetables'
  );

  return (
    <div className="best-seller-container">
      <h2 className="best-seller-title" style={{ textAlign: 'start' }}>Best Sellers</h2>
      <div className="best-seller-grid">
        {vegetableProducts.length > 0 ? (
          vegetableProducts.map((item, index) => (
            <Link
              to={`/product/${item.category.toLowerCase()}/${item._id}`}
              key={index}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ProductItem
                id={item._id}
                name={item.name}
                images={item.images[0]}
                originalPrice={item.originalPrice}
                offerPrice={item.offerPrice}
                category={item.category}
                url={url}
              />
            </Link>
          ))
        )
          : (
            <p>No vegetable products available.</p>
          )}
      </div>
      <div className="bottom-banner">
      <div className="banner-content-right">
        <h2 className='bottom-banner-heading'>Why we are the Best?</h2>
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <img src={feature.icon} alt={feature.title} className="feature-icon" />
            <div className="feature-text">
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      <div className='contact'>
          <div className='contact-heading'>Never Miss a Deal!</div>
          <p>Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
          <div className='info'>
            <input type="email" name="email" id="email" placeholder='Enter Your Email' />
            <button>Subscribe</button>
          </div>
      </div>
    </div>
  );
};

export default BestSeller;
